import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation } from "@/state/api";
import Modal from "@/components/Modal";
import { formatISO } from "date-fns";

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(3, "Project name must have at least 3 letters.")
    .max(50, "Project name must have a max of 50 letters."),
  description: z.string().max(3, "Description must max of 250 letters"),
  startDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Project start date must in the future",
  }),
  endDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Project end date must in the future",
  }),
});

// type ProjectFormValues = z.infer<typeof projectSchema>;

function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {} = useForm({
    resolver: zodResolver(projectSchema),
  });

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });

    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  const isFormValid = () => projectName && description && startDate && endDate;

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating Project..." : "Create"}
        </button>
      </form>
    </Modal>
  );
}

export default NewProjectModal;
