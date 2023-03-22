import React, { useState } from "react";
import Card from "../../../UI/Card/Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CardHeader from "../../../UI/Card/CardHeader";
import { PlusOutlined } from "@ant-design/icons";
import CardButton from "../../../UI/Button/CardButton";
import SectionForm from "./SectionForm/SectionForm";
import List from "./SectionList/List";
import { jsonToFormData } from "../../../../../../utils/base";
import { useDispatch } from "react-redux";
import { addLeadManagerDetail } from "../../../store/actions";
// import { v4 as id } from "uuid";
import { DEFAULT_GUID } from "../../../../../../utils/constants";
function Section(props) {
  const { section, index, handleSectionDetailModal } = props;
  // const [sections, setSections] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let tempObj = {
      sectionId: section.id,
      image: {
        id: DEFAULT_GUID,
        file: null,
      },
      ...values,
    };
    dispatch(addLeadManagerDetail(jsonToFormData(tempObj)));
    // console.log("jsonToFormData(tempObj)", jsonToFormData(tempObj));

    // setSections([...sections, values]);
  };

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="h-fit"
        >
          <Droppable droppableId={section.id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                <Card
                  style={{ background: section.colorCode }}
                  className={`w-[330px] m-[10px] rounded h-fit `}
                >
                  <CardHeader
                    text={section.name}
                    className={"text-white font-semibold"}
                  />
                  <CardButton
                    className={"text-gray-400"}
                    icon={<PlusOutlined className="!text-gray-500" />}
                    onClick={handleToggleForm}
                  />
                  {toggleForm && (
                    <SectionForm
                      onFinish={onFinish}
                      handleToggleForm={handleToggleForm}
                    />
                  )}

                  {section.details.length > 0 && (
                    <div className="bg-white p-2 rounded-sm flex flex-col gap-2 overflow-auto">
                      {section.details.map((sectionList, index) => (
                        <List
                          sectionList={sectionList}
                          color={section.colorCode}
                          id={sectionList.id}
                          index={index}
                          key={sectionList.id}
                          handleSectionDetailModal={handleSectionDetailModal}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Section;
