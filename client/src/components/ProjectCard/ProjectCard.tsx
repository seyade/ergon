import React from "react";
import { Project } from "@/state/api";

type ProjectProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3>{project.name}</h3>
      <p>{project.name}</p>
      <p>{project.startDate}</p>
      <p>{project.endDate}</p>
    </div>
  );
};

export default ProjectCard;
