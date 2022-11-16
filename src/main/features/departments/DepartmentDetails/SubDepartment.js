import React, { useEffect } from "react";
import { Skeleton, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import { getAllDepartments } from "../store/actions";
import ListItem from "../view/ListItem";

const SubDepartment = () => {
  const dispatch = useDispatch();
  const { departments, parentId, loader } = useSelector(
    (state) => state.departmentSlice
  );

  useEffect(() => {
    dispatch(
      getAllDepartments({
        pageSize: 20,
        sortBy: 1,
        parentId: parentId,
      })
    );
  }, []);

  return (
    <>
      {loader && (
        <CardWrapper2>
          {[...Array(15)].map((item) => (
            <Skeleton key={item} paragraph={{ rows: 4 }} />
          ))}
        </CardWrapper2>
      )}

      {departments?.length > 0 && !loader ? (
        <CardWrapper2>
          {departments.map((item, index) => {
            return (
              <>
                <ListItem item={item} id={item.id} key={index} />
              </>
            );
          })}
        </CardWrapper2>
      ) : (
        !loader && <NoDataFound />
      )}
    </>
  );
};

export default SubDepartment;
