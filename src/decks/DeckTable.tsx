import { useState, useReducer } from "react";
import "./style/table.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { IDeck, deck } from "./data/deck";

const columnHelper = createColumnHelper<IDeck>();

const columns = [
  columnHelper.accessor("name", {
    enableResizing: true,

    cell: (info) => {
      return (
        <Link
          style={{
            color: "lightblue",
            textDecoration: "underline",
            width: "200px",
          }}
          href={`/decks/${info.getValue()}`}
        >
          {info.getValue()}
        </Link>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.urgency, {
    id: "urgency",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>urgency</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("desire", {
    header: () => "desire",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("importancy", {
    header: () => <span>importancy</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("clockify", {
    header: "clockify",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("badges", {
    header: "badges",
    cell(props) {
      return props.getValue().map((badge) => (
        <span
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "2px",
            borderRadius: "4px",
            margin: "2px",
          }}
          key={badge}
        >
          {badge}
        </span>
      ));
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("average", {
    header: "average",
    footer: (info) => info.column.id,
  }),
];

export const DeckTable = () => {
  const [data] = useState(() => [...deck]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="styled-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button onClick={() => rerender()} className="border p-2">
          Update Table
        </button>
      </div>
    </div>
  );
};
