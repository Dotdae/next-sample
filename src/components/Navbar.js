"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTask } from "@/context/TaskContext";
import { AiOutlinePlus } from "react-icons/ai";

export default function Navbar() {
  const router = useRouter();
  const { tasks } = useTask();

  return (
    <header className="flex items-center bg-gray-800 px-28 py-3">
      <Link href="/">
        <h1 className="font-black text-3xl text-white">Task app</h1>
      </Link>
      <span className="ml-2 text-gray-400 font-bold">{tasks.length} tasks</span>
      <div className="flex-grow text-right">
        <button
          className="bg-green-500 hover:bg-green-400 px-5 py-2 text-gray font-bold rounded-sm inline-flex items-center"
          onClick={() => router.push("/new")}
        >
          <AiOutlinePlus className="mr-2" />
          Add task
        </button>
      </div>
    </header>
  );
}
