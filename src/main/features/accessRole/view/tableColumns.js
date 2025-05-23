import { EditFilled } from '@ant-design/icons';
import { userTypeList } from '../../../../utils/Shared/enums/enums';

const Edit = (handleEdit, row) => {
  return (
    <EditFilled
      style={{ color: '#1b5669' }}
      onClick={(e) =>
        handleEdit({
          id: row.id,
          name: row.name,
          description: row.description,
          isDefault: row.isDefault,
          roleTypeId: row.roleTypeId,
          features: row.features,
        })
      }
    />
  );
};

export const tableColumns = (
  handleEdit,
  // id,
  // accessRoles,
  Direction,
  sharedLabels
) => {
  return Direction === 'ltr'
    ? [
        {
          title: sharedLabels.name,
          dataIndex: 'name',
          ellipsis: true,
        },
        {
          title: [sharedLabels.description],
          dataIndex: 'description',
          ellipsis: true,
        },
        {
          title: [sharedLabels.userType],
          dataIndex: 'usertype',

          render: (_, row) => {
            return userTypeList.filter((x) => x.id === row.roleTypeId)[0]?.name;
            /*userTypeList &&
							userTypeList.length > 0 &&
							userTypeList
								.filter(function (el) {
									if (el.id === row.roleTypeId) {
										return el.name;
									}
								})
								.map(data => data.name)*/
          },
        },
        {
          title: [sharedLabels.action],
          dataIndex: 'action',
          render: (_, row) => {
            return Edit(handleEdit, row);
          },
        },
      ]
    : [
        {
          title: [sharedLabels.action],
          dataIndex: 'action',
          width: '10%',
          render: (_, row) => {
            return Edit(handleEdit, row);
          },
        },
        { title: [sharedLabels.description], dataIndex: 'description' },
        { title: [sharedLabels.name], dataIndex: 'name' },
      ];
};
