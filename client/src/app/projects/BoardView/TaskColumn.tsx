import { useDrop } from "react-dnd";
import { EllipsisVertical, Plus } from "lucide-react";
import { Task as TaskType } from "@/state/api";
import Task from "@/app/projects/BoardView/Task";

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
  console.log("TASKS:::", tasks);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  // const statusColour: any = {
  //   "To Do": "#2563eb",
  //   "Work In Progress": "#059669",
  //   Review: "#d97706",
  //   QA: "#ddd",
  //   Completed: "#000",
  // };

  const statusColour: any = {
    "To Do": "#2563eb",
    "Work In Progress": "#059669",
    Review: "#d97706",
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

            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskColumn;
