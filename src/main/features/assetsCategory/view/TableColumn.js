import { EditFilled } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';

const Edit = (handleEdit, row, setClearButton) => {
  return (
    <EditFilled
      style={{ color: '#1b5669' }}
      onClick={(e) => {
        handleEdit({
          id: row.id,
          name: row.name,
          description: row.description,
          accountId: row.accountId,
          parentId: row.parentId,
        });
        setClearButton(true);
      }}
    />
  );
};

export const tableColumn = (
  handleEdit,
  handleDelete,
  removeButtons = false,
  rights,
  id,
  setClearButton
) => {
  return [
    { title: 'Category Name', dataIndex: 'name', width: '20%', key: 1 },
    { title: 'Description', dataIndex: 'description', width: '20%', key: 2 },
    { title: 'Account Type', dataIndex: 'accountId', width: '20%', key: 3 },
    {
      title: 'Parent Account',
      dataIndex: 'parentName',
      width: '25%',
      key: 4,
    },
    removeButtons
      ? {}
      : {
          align: 'right',
          key: 3,
          render: (_, row) => {
            if (id && row.id === id) return <LoadingOutlined key={row} />;
            if (rights.length <= 0) return;

            if (rights.includes(1) && rights.includes(2))
              return (
                <>
                  {Edit(handleEdit, row, setClearButton)}{' '}
                  {/* {Delete(handleDelete, row)}{' '} */}
                </>
              );

            if (rights.includes(1)) return Edit(handleEdit, row);
            // if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};
