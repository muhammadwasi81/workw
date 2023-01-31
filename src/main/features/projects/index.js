import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import { projectsDictionaryList } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import ListItem from "./UI/ListItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProjects } from "./store/actions";
import { CardWrapper2 } from "../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./UI/TableColumn";
import { Table } from "../../sharedComponents/customTable";
import ProjectTopBar from "./view/ProjectTopBar/ProjectTopBar";
import useDebounce from "../../../utils/Shared/helper/use-debounce";
import { NoDataFound } from "../../sharedComponents/NoDataIcon";
import Header from "../../layout/header";
import { ROUTES } from "../../../utils/routes";
import { Drawer } from "antd";
import { handleComposer } from "./store/slice";
import Composer from "./UI/Composer";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [tableView, setTableView] = useState(false);
  const [sortBy, setSortBy] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const value = useDebounce(search, 500);
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary, Direction } = projectsDictionaryList[
    userLanguage
  ];
  const { createTextBtn, topBar } = projectsDictionary;
  const { projects, loader } = useSelector((state) => state.projectSlice);

  useEffect(() => {
    dispatch(
      getAllProjects({
        pageNo,
        pageSize,
        search: value,
        sortBy: sortBy,
      })
    );
  }, [value, pageSize, pageNo, sortBy]);

  const items = [
    {
      name: projectsDictionary.routeName,
      to: `${ROUTES.PROJECT.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const handleColumnSorting = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    setPageSize(pageSize);
    setPageNo(current);
    const { order } = sorter;
    if (order === "ascend") {
      setSortBy(2);
      return;
    }
    setSortBy(1);
  };
  const { isComposerOpen, projectDetail, isEditComposer } = useSelector(
    (state) => state.projectSlice
  );
  const handleEditComposer = () => {
    dispatch(handleComposer({ isOpen: false, isEdit: false }));
  };
  return (
    <>
      <TabbableContainer>
        <Header createTextBtn={createTextBtn} />
        <ProjectTopBar
          handleView={(isTable) => {
            setTableView(isTable);
          }}
          handleSearch={(search) => {
            setSearch(search);
          }}
          topBar={topBar}
        />

        <ContBody className="!block" direction={Direction}>
          {tableView && (
            <Table
              columns={tableColumn(projectsDictionary)}
              dragable={true}
              data={projects}
              handleChange={handleColumnSorting}
            />
          )}

          {projects?.length > 0 && !loader && !tableView ? (
            <CardWrapper2>
              {projects.map((item, index) => {
                return <ListItem item={item} id={item.id} key={index} />;
              })}
            </CardWrapper2>
          ) : (
            !loader && !tableView && <NoDataFound />
          )}

          {/* {projects?.length > 0 ? (
						tableView ? (
							<Table
								columns={tableColumn()}
								dragable={true}
								data={projects}
								handleChange={handleColumnSorting}
							/>
						) : (
							<CardWrapper2>
								{projects.map((item, index) => {
									return (
										<>
											<ListItem
												item={item}
												id={item.id}
												key={index}
											/>
										</>
									);
								})}
							</CardWrapper2>
						)
					) : loader ? (
						"loading"
					) : (
						"No Data Found"
					)} */}
          <Drawer
            open={isComposerOpen}
            width={"786px"}
            onClose={handleEditComposer}
            title={"Update Project"}
            className={"shared_drawer drawerSecondary"}
          >
            <Composer
              buttonText={"Update Project"}
              detail={projectDetail}
              update={isEditComposer}
              id={projectDetail?.id}
            />
          </Drawer>
        </ContBody>
      </TabbableContainer>
    </>
  );
};

export default Projects;
