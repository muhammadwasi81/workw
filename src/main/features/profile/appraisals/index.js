const AppraisalTable = () => {
  return (
    <div className="createEntryTable">
      <table className="!min-w-full">
        <thead>
          <tr>
            <th className="!py-1 !px-2 text-left">Name</th>
            <th className="!py-1 !px-2 text-left">Productivity</th>
            <th className="!py-1 !px-2 text-left">Relations with others</th>
            <th className="!py-1 !px-2 text-left">Evaluation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="!py-1 !px-2 text-left">John Doe</td>
            <td className="!py-1 !px-2 text-left">60%</td>
            <td className="!py-1 !px-2 text-left">50%</td>
            <td className="!py-1 !px-2 text-left">2020-01-01 12:00:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AppraisalTable;
