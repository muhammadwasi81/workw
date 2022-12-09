import { Skeleton } from "antd";
import { useEffect, useState,useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import {  getAllTaxSlab, removeTaxSlab } from "../store/actions";
import { TaxSlabDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";


export default function TableView({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton 
}) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,taxSlab,sharedLabels,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration.grade.Grade);

  const dispatch = useDispatch();
  const {items,loadingData}=  useSelector((state) => state.taxSlabGroupSlice);
  console.log(items, 'itemWorkPlease');

  useEffect(() => {
    dispatch(getAllTaxSlab(
      {
        "pageNo": 0,
        "pageSize": 20,
        "search": "",
        "sortBy": 1
      }
    ));
  }, []);
  
  const [id, setId] = useState()
  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        taxSlab,
        handleEdit,
        //handleDelete,
        removeButtons,
        actionRights,
        id,
        setClearButton,
        sharedLabels,
      )}
      dataSource={items}
      pagination={false}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
      locale={
        loadingData && {
          emptyText: (
            <Skeleton.Input
              active="true"
              size="small"
              block={true}
              loading={loadingData}
              round="true"
              shape="circle"
              style={{ width: "100%", marginBottom: 2 }}
            />
          ),
        }
      }
    />
  );
}
