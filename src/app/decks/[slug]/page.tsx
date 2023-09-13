import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        style={{
          display: "flex",
          width: "1140px",
          justifyContent: "start",
          marginTop: "20px",
        }}
      >
        <Link
          href={"/decks"}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "2px",
            borderRadius: "4px",
            margin: "2px",
          }}
        >
          Go back
        </Link>
      </div>
    </main>
  );
}
