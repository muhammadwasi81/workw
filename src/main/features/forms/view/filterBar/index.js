import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import TopBar from "../../../../sharedComponents/topBar/topBar";
// import { documentDictionaryList } from "../../localization/index";
import { handleChangeTab } from "../../store/slice";
import { FormFilterTypeEnum } from "../../enum/index";
import { getAllForms } from "../../store/actions";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";

const FilterBar = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const {
    forms,
    createForms,
    allForms,
    myForms,
    forApprovals,
    list,
    table,
    copyLink,
    attempt,
  } = documentDictionary;
  const dispatch = useDispatch();
  const handleTabChange = (tab) => {
    dispatch(handleChangeTab(tab));
  };

  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllForms(filter));
  }, [filter, search]);
  // console.log(props, "props filter bar");

  const onSegment = (value) => {
    if (value === table) {
      // setTableView(true);
      props.onSegment(true);
    } else {
      // setTableView(false);
      // props.tableView = tableView;
      props.onSegment(false);
    }
  };

  return (
    <TopBar
      onSearch={(value) => {
        setFilter({ ...filter, search: value });
      }}
      buttons={[
        {
          name: allForms,
          to: "allForms",
          onClick: () => setFilter({ filterType: FormFilterTypeEnum.All }),
        },
        {
          name: myForms,
          to: "myForms",
          onClick: () =>
            setFilter({ filterType: FormFilterTypeEnum.CreatedByMe }),
        },
        {
          name: forApprovals,
          to: "forApprovals",
          onClick: () =>
            setFilter({ filterType: FormFilterTypeEnum.ForApproval }),
        },
      ]}
      // filter={{
      //   onFilter: () => {},
      // }}
      segment={{
        // onSegment: (value) => {
        //   if (value === "Table") {
        //     console.log("table view");
        //     // setTableView(true);
        //     // props.tableView(tableView);
        //   } else {
        //     console.log("List View view");
        //     // setTableView(false);
        //     // props.tableView = tableView;
        //     // props.tableView(tableView);
        //   }
        // },
        onSegment: (val) => onSegment(val),
        label1: list,
        label2: table,
      }}
    />
  );
};

export default FilterBar;
