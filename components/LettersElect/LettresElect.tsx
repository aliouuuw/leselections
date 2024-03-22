"use client";

import CardStack from "./CardStack";

type Letter = {
  author: string;
  email: string;
  preview: string;
}

export default function LettresElect() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack letters={letters} />
    </div>
  );
}
const letters: Letter[] = [
  {
    author: "John",
    email: "john.doe@example.com",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    author: "Jane",
    email: "jane.smith@example.com",
    preview: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    author: "Alice",
    email: "alice.johnson@example.com",
    preview: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  // Add more letter objects as needed
];

