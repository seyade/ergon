"use client";

import React from "react";
import Image from "next/image";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useGetUsersQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/utils";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-between">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    field: "teamId",
    headerName: "Team ID",
    width: 100,
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl font-bold">Loading..</p>
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl font-bold">
          Seems like something went wrong while fetching users!
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header title="Users" />

      <div style={{ width: 650, height: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default Users;
