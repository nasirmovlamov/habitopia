"use client";

import { badges } from "@/decks/data/badges";

export const BadgesTable = () => {
  return (
    <div className="flex flex-col items-center">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center w-1/2 border-2 border-black p-10 mt-10"
        >
          <div className="text-2xl">{badge.name}</div>
          <div className="flex gap-10 mt-10">{badge.description}</div>
        </div>
      ))}
    </div>
  );
};
