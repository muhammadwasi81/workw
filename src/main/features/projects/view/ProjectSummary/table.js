import React from 'react';

const ProjectSummaryTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th
            className="!py-1 !px-2 text-left"
            style={{ width: 100, minWidth: 150 }}
          >
            Expense
          </th>
          <th
            className="!py-1 !px-2 text-left"
            style={{ width: 100, minWidth: 150 }}
          >
            Amount
          </th>
          <th
            className="!py-1 !px-2 text-left"
            style={{ width: 100, minWidth: 150 }}
          >
            Amount
          </th>
          <th
            className="!py-1 !px-2 text-left"
            style={{ width: 100, minWidth: 140 }}
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="!py-1 !px-2 text-left font-semibold text-gray-500">
            Total Expense
          </td>
          <td className="!py-1 !px-2 text-left font-semibold text-gray-500">
            45
          </td>
          <td className="!py-1 !px-2 text-left font-semibold text-gray-500">
            23
          </td>
          <td className="!py-1 !px-2 text-left font-semibold text-gray-500">
            85
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectSummaryTable;
