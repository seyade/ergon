"use client";

import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useSearchQuery } from "@/state/api";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl font-bold">Loading..</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-2xl font-bold">
          Seems like something went wrong while fetching project!
        </p>
      </div>
    );
  }

  return <div>Search</div>;
};

export default Search;
