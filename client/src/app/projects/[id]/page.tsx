"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader/ProjectHeader";
import BoardView from "@/app/projects/BoardView";
import ListView from "@/app/projects/ListView";
import Timeline from "@/app/projects/Timeline";
import Table from "@/app/projects/Table";

type ProjectProps = {
  params: { id: string };
};

const Project = ({ params }: ProjectProps) => {
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const { id } = params;

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <BoardView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "List" && (
        <ListView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "Timeline" && (
        <Timeline id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "Table" && (
        <Table id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}
    </div>
  );
};

export default Project;
