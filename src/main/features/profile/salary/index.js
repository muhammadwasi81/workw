const SalaryTable = () => {
  return (
    <div className="createEntryTable">
      <table className="!min-w-full">
        <thead>
          <tr>
            <th className="!py-1 !px-2 text-left">Name</th>
            <th className="!py-1 !px-2 text-left">Address</th>
            <th className="!py-1 !px-2 text-left">Social insurance No</th>
            <th className="!py-1 !px-2 text-left">Evaluation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="!py-1 !px-2 text-left">Alex Hales</td>
            <td className="!py-1 !px-2 text-left">
              123, Main Street, New York, USA
            </td>
            <td className="!py-1 !px-2 text-left">123-456-789</td>
            <td className="!py-1 !px-2 text-left">2020-02-02 12:00:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;
