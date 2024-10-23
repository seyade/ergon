import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "@/state/api";
import Modal from "@/components/Modal";

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || endDate) return;

    await createProject({
      name: projectName,
      description,
      startDate,
      endDate,
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
      </form>
    </Modal>
  );
}

export default NewProjectModal;
