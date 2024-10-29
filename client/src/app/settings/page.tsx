"use client";

import Header from "@/components/Header";
import React, { useState } from "react";

const Settings = () => {
  const [username, setUsername] = useState("jamesbond");
  const [email, setEmail] = useState("james.bond@mi5.io");
  const [teamName, setTeamName] = useState("Secret Agency");
  const [roleName, setRoleName] = useState("Agent");

  const userSettings = {
    username: "jamesbond",
    email: "james.bond@mi5.io",
    teamName: "Secret Agency",
    roleName: "Agent",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-8">
      <Header title="Settings" />
      <div className="space-y-4">
        <form action="">
          <div>
            <label htmlFor="username" className={labelStyles}>
              Username
            </label>
            <input
              value={userSettings.username}
              id="username"
              className={textStyles}
              disabled
            />
          </div>
          <div>
            <label htmlFor="email" className={labelStyles}>
              Email
            </label>
            <input
              value={userSettings.email}
              id="email"
              className={textStyles}
              disabled
            />
          </div>
          <div>
            <label htmlFor="teamName" className={labelStyles}>
              Team
            </label>
            <input
              value={userSettings.teamName}
              id="teamName"
              className={textStyles}
              disabled
            />
          </div>
          <div>
            <label htmlFor="roleName" className={labelStyles}>
              Role
            </label>
            <input
              value={userSettings.roleName}
              id="roleName"
              className={textStyles}
              disabled
            />
          </div>
        </form>

        {/* <div>
          <label htmlFor={labelStyles}>Username</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div>
          <label htmlFor={labelStyles}>Email</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div>
          <label htmlFor={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label htmlFor={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
