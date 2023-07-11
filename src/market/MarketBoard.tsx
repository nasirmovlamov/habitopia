"use client";

import { useEffect, useMemo } from "react";
import { useHabitStore } from "@/store/useHabitTaskStore";
import { useMarketStore } from "@/store/useMarket";
import { Product } from "../components/Product";

export const MarketBoard = () => {
  const { products, add: addProduct, init: initProducts } = useMarketStore();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addProduct({
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: "test",
      price: 5,
      stock: 5,
    });
  };

  const listProducts = useMemo(() => {
    return (
      <>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </>
    );
  }, [products]);

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <div className="flex flex-col items-center w-[350px]">
      <div className="text-[20px] w-full font-bold">
        <span>Products</span>
      </div>
      <form onSubmit={handleSubmit} className="w-full  mt-5">
        <input
          name="task"
          type="text"
          placeholder="Add a Product"
          className="w-full border-2 border-gray-300 rounded-md p-2 text-black"
        />
      </form>
      <div className="flex flex-col gap-10 mt-10 w-full">{listProducts}</div>
    </div>
  );
};
