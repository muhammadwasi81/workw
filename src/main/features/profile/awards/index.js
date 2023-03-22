const AwardsTable = () => {
  return (
    <div className="createEntryTable">
      <table className="!min-w-full">
        <thead>
          <tr>
            <th className="!py-1 !px-2 text-left">Name</th>
            <th className="!py-1 !px-2 text-left">Email</th>
            <th className="!py-1 !px-2 text-left">Phone No</th>
            <th className="!py-1 !px-2 text-left">Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="!py-1 !px-2 text-left">Franklin Williams</td>
            <td className="!py-1 !px-2 text-left">frank@tech.dev</td>
            <td className="!py-1 !px-2 text-left">
              <a href="tel:+1234567890">+1234567890</a>
            </td>
            <td className="!py-1 !px-2 text-left">
              123, Main Street, New York, USA
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AwardsTable;
