import React, { useState, useEffect } from "react";
import Header from "./header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import FormDetailCards from "./formDetailCards";
import FormShortCard from "./formShortCards";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../../sharedComponents/customTable";
import { getAllForms } from "../store/actions";
import { tableColumn } from "../TableColumn";

const Forms = (props) => {
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");
  const [tableView, setTableView] = useState(false);

  const { forms } = useSelector((state) => state.formSlice);

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

  const setView = (val) => {
    console.log("set table value");
    setTableView(val);
  };

  return (
    <TabbableContainer>
      <Header />
      <FilterBar onSegment={(val) => setView(val)} />
      <ContBody>
        {tableView && (
          <Table
            columns={tableColumn()}
            dragable={true}
            data={forms ? forms : []}
          />
        )}

        {!tableView && <FormShortCard />}
      </ContBody>
    </TabbableContainer>
  );
};

export default Forms;
