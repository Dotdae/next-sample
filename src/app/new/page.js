"use client";
import { useState, useEffect } from "react";
import { useTask } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Page({ params }) {
  const { tasks, createTask, updateTask } = useTask();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
      toast.success("Task updated successfully!");
    } else {
      createTask(data.title, data.description);
      toast.success("Task created successfully!");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-gray-700 p-10" onSubmit={onSubmit}>
        <h1 className="text-3xl mb-3">
          {params.id ? "Edit Task" : "New Task"}
        </h1>
        <input
          type="text"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block"
          placeholder="Write a title"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="block text-red-400 mb-2">This field is required</span>}
        <textarea
          name="description"
          cols="2"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-1 block"
          {...register("description", { required: true })}
        />
        {errors.description && <span className="block text-red-400 mb-2">This field is required</span>}
        <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled-opacity-30">Save</button>
      </form>
    </div>
  );
}
