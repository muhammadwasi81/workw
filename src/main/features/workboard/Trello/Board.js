import React, { useCallback, useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button ,Modal} from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList/AddList";
import { useSelector, useDispatch } from "react-redux";
import List from "./List/List";
import {
  moveCard,
  moveList,
  moveSection,
  moveSectionTodo,
} from "../store/slice";
import { useParams } from "react-router-dom";
import {
  getAllWorkBoardTodoPaging,
  getWorkboardById,
  moveWorkBoardSection,
  moveWorkBoardTodo,
} from "../store/action";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import CardDetailModal from "./Modal/CardDetailModal";
import DateModal from "../Modal/DateModal";
import BoardTopBar from "./BoardTopBar/TopBar";
import CustomSelect from "../../../sharedComponents/Select/Select";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";
// import Spinner from "../../../sharedComponents/spinner/spinner";
import { Table } from "../../../sharedComponents/customTable";
import { sectionTableColumn } from "./tableColumns";
import CardEditor from "../Trello/Card/CardEditor";
import TableTodo from "../UI/TableEditButton/TableEditButton";
import {addWorkBoardSectionTodo} from "../store/action";
import TableEntryItem from "../Trello/EntryItem";
import CreateEntryHead from "../Trello/EntryItemHead";

function Board() {
  
const initialEntry = {
title:"",
workBoardSection:"",
description:"",
labels:"",
createDate:"",
}
//const initialEntries = Array(4).fill(initialEntry);
  
  const [addingList, setAddingList] = useState(false);
  const [tableInput, setTableInput] = useState(false);

  console.log(tableInput,"tableInputtableInput");
  const workboardDetail = useSelector(
    (state) => state.trelloSlice.workboardDetail
  );
  
  const sectionTableData = useSelector(
    (state) => state.trelloSlice.sectionTableData
  );

  console.log(sectionTableData,"sectionTableData");
  console.log(workboardDetail?.section?.sectionId,"workboardDetailsectionID");

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    dispatch(getWorkboardById(id));
    dispatch(
      getAllWorkBoardTodoPaging({
        pageNo: 0,
        pageSize: 20,
        search: "",
        boards: [id],
        members: [],
        sections: [],
        sortBy: 1,
      })
    );
  }, []);

  const toggleAddingList = () => {
    setAddingList(!addingList);
  };

  const handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      // console.log("drag");
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        // console.log("old index", source.index);
        // console.log("new index", destination.index);
        dispatch(
          moveSection({
            oldListIndex: source.index,
            newListIndex: destination.index,
          })
        );
        dispatch(
          moveWorkBoardSection({
            workBoardId: id,
            currentIndexNo: Number(source.index) + 1,
            targetIndexNo: Number(destination.index) + 1,
          })
        );
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      // console.log("move card");
      // console.log("sourceListId", source.droppableId);
      // console.log("destListId", destination.droppableId);
      // console.log("oldCardIndex", source.index);
      // console.log("newCardIndex", destination.index);
      dispatch(
        moveSectionTodo({
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        })
      );
      dispatch(
        moveWorkBoardTodo({
          currentSectionId: source.droppableId,
          targetSectionId: destination.droppableId,
          currentIndexNo: Number(source.index) + 1,
          targetIndexNo: Number(destination.index) + 1,
        })
      );
    }
  };

  const items = [
    {
      name: workboardDetail && workboardDetail.name,
      to: `${ROUTES.WORKBOARD.BOARD + id}`,
    },
  ];
  const loader = useSelector((state) => state.trelloSlice.loader);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { topBar, labels } = WorkBoardDictionaryList;
  const [isTableView, setIsTableView] = useState(false);
  const [isModalOpen , setIsModalOpen] = useState(false);
  const [selectedId,setSelectedId] = useState();

  const [entries, setEntries] = useState(initialEntry);
 
  const [listData, setListData] = useState({
		editingTitle: false,
	  title: workboardDetail?.section?.name,
		addingCard: false,
	});
  
  console.log(listData,"listDatalistData");
  


  const toggleAddingCard = (e) =>
		setListData(prevState => ({
			...prevState,
		})
    //dispatch(addWorkBoardSectionTodo({sectionId:workboardDetail?.sectionId,title}));
);
    const addCard = async cardText => {
      
      setIsModalOpen(false);
      toggleAddingCard();
      if (cardText.trim().length) {
        dispatch(
          addWorkBoardSectionTodo({
            sectionId:selectedId,
            title: cardText,
          })
        );
        // dispatch(addListCard({ cardText, cardId, listId: section.id }));
      }
    };

   
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const showModal = () =>{
      setIsModalOpen(true);
    }

    const handleRemoveRow = (index) => {
      console.log(index);
      let filteredRows = [...entries];
      filteredRows.splice(index, 1);
      setEntries(filteredRows);
    };
    const handleChange1 = (value, name, index) => {
      console.log("value",index);
      let tempEntries = [...entries];
      tempEntries[index] = {
        ...tempEntries[index],
        [name]: value,
      };
      setEntries(tempEntries);
    };
    const handleChange = (LabeledValue) => {
      console.log(selectedId,"88888");

      setSelectedId(LabeledValue);
        console.log(selectedId,"LabeledValue");
    }
    const onRow = (record, rowIndex) => {    
      return {
        onClick: (event) => {
          //setTableInput(true);
          const { id } = record;
          console.log("recordddd",rowIndex);
          //navigate(`${ROUTES.WORKBOARD.BOARD}${id}`);
        }, // click row
        // onDoubleClick: (event) => {}, // double click row
        // onContextMenu: (event) => {}, // right button click row
        // onMouseEnter: (event) => {}, // mouse enter row
        // onMouseLeave: (event) => {}, // mouse leave row
      };
    };
    const onActionClick = (row) => {
      console.log("onactionclick", row);
    };
   

  return (
    <>
      <TabbableContainer className="">
        <LayoutHeader items={items} />

        <BoardTopBar
          handleView={(isTable) => {
            setIsTableView(isTable);
          }}
          topBar={topBar}
        />
        <ContBody className="!block" direction={Direction}>
          {!isTableView ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable
                droppableId="board"
                direction="horizontal"
                type="COLUMN"
              >
                {(provided, _snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className="Board h-full flex overflow-x-auto bg-white"
                  >
                    {workboardDetail &&
                      workboardDetail.sections.map((section, index) => {
                        return (
                          <List
                            section={section}
                            sectionId={section.id}
                            key={section.id}
                            index={index}
                            colorCode={section.colorCode}
                            workBoardId={section.workBoardId}
                            labels={labels}
                          />
                        );
                      })}

                    {provided.placeholder}
                    <div className="Add_List w-[264px] m-[10px] flex-shrink-0">
                      {!addingList ? (
                        <Button
                          className="!flex !items-center !bg-neutral-400 !rounded-sm !text-white hover:!bg-neutral-500 !border-none mx-2 !w-[264px]"
                          icon={<PlusOutlined />}
                          onClick={toggleAddingList}
                        >
                          {labels.addSection}
                        </Button>
                      ) : (
                        <AddList
                          toggleAddingList={toggleAddingList}
                          sectionId={id}
                          labels={labels}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (

            <>
             <div className="float-right">
                <Button
                  onClick={showModal}
                  icon={<PlusOutlined />}
                  className="ant-btn ant-btn-default ant-btn-sm ant-btn-background-ghost 
                  !bg-transparent !items-center !flex !border-none !text-[#5e6c84] 
                  hover:!text-[#172b4d] hover:!bg-[#091e4214] !text-sm w-full"
                  ghost={true}
                  size="small">Add Todo
                </Button>
              </div>

                <Modal 
                  footer={null}
                  closable={false}
                  title={false}
                  open={isModalOpen} onCancel={handleCancel} onOk={handleOk}
                  >
                
                  <span className="text-gray-500 font-bold ml-[3px]">Todo Section </span>
                   <div className="List-Title !cusrsor-pointer p-2 break-words font-bold w-full">
                     <CustomSelect
                        showSearch={true}
                        data={workboardDetail?.sections}
                        size="large"
                        placeholder="Please select Todo Section"
                        onChange={handleChange}
                      />
                    </div>
                   <span className="text-gray-500 font-bold ml-[3px]">Todo Title</span>
                  <TableTodo onSave={addCard}/>
               </Modal>  
            
              


            {/* <Table
              columns={sectionTableColumn(sectionTableData,onActionClick,WorkBoardDictionaryList)}
              data={sectionTableData}
              loading={loader}
              onRow={onRow}
            /> */}
              <div className="createEntryTable mt-6">
                    <div className="bg-white p-4 rounded-md overflow-x-auto">
                    <table>
                    <CreateEntryHead/>
                      <tbody>
                        {sectionTableData.map((item, ind) => {
                          return (
                            <TableEntryItem
                              key={ind}
                              index={ind}
                              // accounts={sectionTableData}
                              handleChange={handleChange1}
                              handleRemoveRow={handleRemoveRow}
                              itemValue={item}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                </>
          )}

        </ContBody>
      </TabbableContainer>
      <CardDetailModal />
      <DateModal />
      {/* <EditMembers /> */}
    </>
  );
}

export default React.memo(Board);
