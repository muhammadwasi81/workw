import React, { useState, useEffect } from "react";
import Header from "./header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import FormDetailCards from "./formDetailCards";
import FormShortCard from "./formShortCards";
import { useDispatch } from "react-redux";
import { getAllForms } from "../store/actions";

const Forms = () => {
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect works for get all forms");
    dispatch(
      getAllForms({
        filter,
        search,
      })
    );
  }, [filter, search]);

  return (
    <TabbableContainer>
      <Header />
      <FilterBar />
      <ContBody>
        <FormShortCard />
      </ContBody>
    </TabbableContainer>
  );
};

export default Forms;
