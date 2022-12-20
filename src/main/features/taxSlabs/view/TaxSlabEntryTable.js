import React, { useEffect, useState } from "react";
import CreateEntryItem from "./CreateEntryTable";
import { Button } from "antd";
import SlabTableHeader from "./SlabTableHeader";
import { useSelector } from "react-redux";

const SlabCreateTable = ({ defaultRows, handleChangeTable }) => {
  const { taxSlabDetail } = useSelector((state) => state.taxSlabGroupSlice);
  const defaultEntry = {
    name: "",
    min: "",
    max: "",
    percentage: "",
    previousCharge: "",
  };
  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [entries, setEntries] = useState(initialEntries);

  useEffect(() => {
    setEntries(Array(defaultRows).fill(defaultEntry));
  }, []);

  useEffect(() => {
    if (taxSlabDetail) {
      setEntries(taxSlabDetail.taxSlab);
    }
  }, [taxSlabDetail]);

  const handleAddRow = () => {
    setEntries([...entries, defaultEntry]);
  };

  const handleRemoveRow = (index) => {
    let filteredRows = [...entries];
    filteredRows.splice(index, 1);
    setEntries(filteredRows);
  };

  const createPayload = () => {
    let payload = {
      taxSlab: entries
        .filter((item) => item.name)
        .map((entry) => ({
          name: entry.name,
          min: entry.min,
          max: entry.max,
          percentage: entry.percentage,
          previousCharge: entry.previousCharge,
        })),
    };
    return payload;
  };

  const handleChange = (value, name, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = {
      ...tempEntries[index],
      [name]: value,
    };
    setEntries(tempEntries);
  };

  const handleSubmit = () => {
    let payload = createPayload();
    handleChangeTable(payload);
  };
  useEffect(() => {
    handleSubmit();
  }, [entries]);

  return (
    <div className="createEntryTable">
      <div className="bg-white rounded-md overflow-x-auto">
        <table>
          <SlabTableHeader />
          <tbody>
            {entries.map((item, ind) => {
              return (
                <CreateEntryItem
                  key={ind}
                  index={ind}
                  handleChange={handleChange}
                  handleRemoveRow={handleRemoveRow}
                  value={item}
                />
              );
            })}
          </tbody>
        </table>
        <div className="tableActions">
          <Button
            className="ThemeBtn mr-2"
            onClick={() => setEntries(Array(defaultRows).fill(defaultEntry))}
          >
            Clear
          </Button>
          <div
            className="defaultBtn addRowBtn cursor-pointer"
            onClick={handleAddRow}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlabCreateTable;
