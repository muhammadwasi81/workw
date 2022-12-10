import '../../styles.css';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th
          className="!py-1 !px-2 text-left"
          style={{ width: 50, minWidth: 50 }}
        ></th>
        <th
          className="!py-1 !px-2 text-left"
          style={{ width: 200, minWidth: 200 }}
        >
          Name
        </th>
        <th
          className="!py-1 !px-2 text-left"
          style={{ width: 200, minWidth: 200 }}
        >
          Designation
        </th>
        <th
          className="!py-1 !px-2 text-left"
          style={{ width: 50, minWidth: 50 }}
        ></th>
      </tr>
    </thead>
  );
};

export default TableHead;
