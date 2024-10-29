import React from "react";
import { Project, User } from "@/state/api";
import Image from "next/image";

type UserProps = {
  user: User;
};

const UserCard = ({ user }: UserProps) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`/p1.jpg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.userId}</h3>
        <p>{user.username}</p>
      </div>
    </div>
  );
};

export default UserCard;
