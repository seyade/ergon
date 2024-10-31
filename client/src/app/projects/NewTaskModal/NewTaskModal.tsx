import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import Modal from "@/components/Modal";
import { formatISO } from "date-fns";

type NewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
};

export const taskSchema = z.object({
  taskTitle: z
    .string()
    .min(3, "Project name must have at least 3 letters.")
    .max(50, "Project name must have a max of 50 letters."),
  description: z.string().max(3, "Description must max of 250 letters"),
  status: z.string().refine((status) => {
    return status.match(/To Do|Work In Progress|Review|Completed/);
  }),
  priority: z.string().refine((status) => {
    return status.match(/Urgent|High|Medium|Low|Urgent/);
  }),
  tags: z.string().max(3),
  startDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Project start date must in the future",
  }),
  dueDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Project end date must in the future",
  }),
  authorUserId: z.string(),
  assignedUserId: z.string(),
});

// type TaskFormValues = z.infer<typeof taskSchema>;

function NewTaskModal({ isOpen, onClose, projectId }: NewTaskModalProps) {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const {} = useForm({
    resolver: zodResolver(taskSchema),
  });

  const handleSubmit = async () => {
    if (!taskTitle || !authorUserId) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });

    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title: taskTitle,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: Number(projectId),
    });
  };

  const isFormValid = () => taskTitle && authorUserId;

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <div className=""></div>
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(event) =>
              setStatus(Status[event?.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>{Status.ToDo}</option>
            <option value={Status.WorkInProgress}>
              {Status.WorkInProgress}
            </option>
            <option value={Status.Review}>{Status.Review}</option>
            <option value={Status.Completed}>{Status.Completed}</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(event) =>
              setPriority(
                Priority[event?.target.value as keyof typeof Priority],
              )
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>{Priority.Urgent}</option>
            <option value={Priority.High}>{Priority.High}</option>
            <option value={Priority.Medium}>{Priority.Medium}</option>
            <option value={Priority.Low}>{Priority.Low}</option>
            <option value={Priority.Backlog}>{Priority.Backlog}</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author ID"
          value={authorUserId}
          onChange={(event) => setAuthorUserId(event.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assignee ID"
          value={assignedUserId}
          onChange={(event) => setAssignedUserId(event.target.value)}
        />
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating Task..." : "Create"}
        </button>
      </form>
    </Modal>
  );
}

export default NewTaskModal;
