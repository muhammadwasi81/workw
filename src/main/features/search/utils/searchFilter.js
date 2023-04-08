import React from "react";

export const SearchFilter = (value = "") => {
  if (typeof value !== "string") {
    return 0;
  }
  const data = value.toLowerCase();
  console.log(data, "dataaa");
  if (data.includes("feed")) {
    return 1;
  } else if (data.includes("lead manager") || data.includes("lead")) {
    return 2;
  } else if (data.includes("travel")) {
    return 3;
  } else if (data.includes("document")) {
    return 4;
  } else {
    return 0;
  }
};
export default SearchFilter;
