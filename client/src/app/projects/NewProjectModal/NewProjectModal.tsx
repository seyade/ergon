import React, { useState } from "react";
import { formatISO } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation } from "@/state/api";
import Modal from "@/components/Modal";

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(3, "Project name must have at least 3 letters.")
    .max(50, "Project name must have a max of 50 letters."),
  description: z.string(),
  startDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Project start date must in the future",
  }),
  endDate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Project end date must in the future",
  }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (formData: ProjectFormData) => {
    const { projectName, startDate, endDate, description } = formData;

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

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            className={inputStyles}
            placeholder="Project Name"
            {...register("projectName")}
          />
          <p>{errors.projectName?.message}</p>
        </div>
        <div>
          <textarea
            className={inputStyles}
            placeholder="Description"
            {...register("description")}
          />
          <p>{errors.description?.message}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <div>
            <input
              type="date"
              className={inputStyles}
              {...register("startDate")}
            />
            <p>{errors.startDate?.message}</p>
          </div>

          <div>
            <input
              type="date"
              className={inputStyles}
              {...register("endDate")}
            />
            <p>{errors.endDate?.message}</p>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
            !isValid && "cursor-not-allowed opacity-50"
          }`}
          disabled={!isValid}
        >
          {isLoading ? "Creating Project..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
}

export default NewProjectModal;
