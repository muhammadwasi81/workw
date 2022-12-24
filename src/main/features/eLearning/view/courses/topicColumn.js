import { DeleteFilled } from '@ant-design/icons';
import { deleteTopic } from '../../store/slice';

export const tableColumn = (dispatch, editData) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
      sort: true,
    },
    {
      title: "Actions",
      dataIndex: "",
      width: "13%",
      render: (value, row, index) => (
        <>
          <DeleteFilled onClick={(() => {
            dispatch(deleteTopic(index))
          })}
            style={{
              color: 'var(--currentThemeColor)',
              margin: "0 auto", 
              display: "block"
            }}
          />
        </>
      ),
    },
  ];
};
