import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Task as TaskType, Status } from "@/state/api";

type BoardViewProps = {
  id: string;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Review", "QA", "Completed"];

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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Seem like something went wrong!</div>;

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

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsNewTaskModalOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColour: any = {
    "To Do": "#2563eb",
    "Work In Progress": "#059669",
    Review: "#d97706",
    QA: "#ddd",
    Completed: "#000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColour[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColour[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="item-center flex text-lg font-semibold dark:text-white">
            {status}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
