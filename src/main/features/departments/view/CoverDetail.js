import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover, Skeleton } from "antd";
import { BiWorld } from "react-icons/bi";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import WhiteCard from "./WhiteCard";
import moment from "moment";
import { toggleCreateComposer } from "../store/slice";
import Composer from "./Composer";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";

function CoverDetail(props) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { departmentDictionary, Direction } = departmentDictionaryList[
    userLanguage
  ];
  const { isCreateComposer, loader } = useSelector(
    (state) => state.departmentSlice
  );

  const { name, members, description, creator, createDate } = props.data;

  return (
    <>
      <SideDrawer
        title={departmentDictionary.createDepartment}
        isDisable={true}
        handleClose={() => dispatch(toggleCreateComposer(false))}
        handleOpen={() => dispatch(toggleCreateComposer(true))}
        isOpen={isCreateComposer}
        children={<Composer />}
      />
      <WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
        <div className="flex w-full justify-between text-base items-center">
          <div className="flex flex-col text-base">
            <span className="text-black text-base font-bold">
              {loader ? (
                <Skeleton.Input className={"mb-1"} active={true} size="small" />
              ) : (
                name && name
              )}
            </span>
            <span className="text-gray-500 text-sm font-bold flex items-center gap-1 ">
              <BiWorld /> Create Date:{" "}
              {loader ? (
                <Skeleton.Input active={true} size="small" />
              ) : (
                createDate && moment(createDate).format("DD/MM/YYYY")
              )}
            </span>
          </div>
          <div></div>
          <div className="text-black text-base font-bold flex items-center gap-2">
            {/* <Popover content={`Created by: ${creator?.name}`}>
            <InfoCircleOutlined className="cursor-pointer" />

          </Popover> */}

            {loader ? (
              <Skeleton.Button active={true} size="medium" />
            ) : (
              <Button
                className="ThemeBtn !flex items-center"
                onClick={() => dispatch(toggleCreateComposer(true))}
              >
                <PlusOutlined /> Add SubDepartment
              </Button>
            )}

            {/* <span>Created by: {creator?.name}</span> */}
          </div>
        </div>
      </WhiteCard>
    </>
  );
}

export default CoverDetail;
