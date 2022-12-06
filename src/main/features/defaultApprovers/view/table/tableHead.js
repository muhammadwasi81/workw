import '../../styles.css';
const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="w-0 !py-1 !px-2 text-left"></th>
        <th className="w-[200px] !py-1 !px-2 text-left">Name</th>
        <th className="w-[200px] !py-1 !px-2 text-left">Designation</th>
        <th className="w-0 !py-1 !px-2 text-left"></th>
      </tr>
    </thead>
  );
};

export default TableHead;
