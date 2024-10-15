import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import TaskColumn from "@/app/projects/BoardView/TaskColumn";

type BoardViewProps = {
  id: string;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
};

// const taskStatus = ["To Do", "Work In Progress", "Review", "QA", "Completed"];

const taskStatus = ["To Do", "Work In Progress", "Review", "Completed"];

const BoardView = ({ id, setIsNewTaskModalOpen }: BoardViewProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl font-bold">Loading..</p>
      </div>
    );

  if (error)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl font-bold">Seems like something went wrong!</p>
      </div>
    );

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-5">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks || []}
              moveTask={moveTask}
              setIsNewTaskModalOpen={setIsNewTaskModalOpen}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default BoardView;
