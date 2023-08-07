"use client"
import { useTask } from "@/context/TaskContext"
import { TaskCard } from "@/components/TaskCard";
import { VscTasklist } from "react-icons/vsc";

export default function Page(){

  const {tasks} = useTask();

  return(
    <div className="flex justify-center">
      {tasks.length === 0 ? (
        <div className="block">
          <h2 className="text-2xl">There are no tasks</h2>
          <VscTasklist size="8rem"/>
        </div>

      ): (
        <div className="w-7/10">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
          ))}
        </div>
      )}
    </div>
  )

}
