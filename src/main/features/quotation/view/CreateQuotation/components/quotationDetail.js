import React from "react";
import moment from "moment";
import { Divider, Table } from "antd";

const QuotationDetail = ({ quotationDetails }) => {
  // useEffect(() => {
  //   if (id) dispatch(getQuotationById(id));
  // }, [id]);

  // const quotationDetail = useSelector(
  //   (state) => state.quotationSlice.quotationDetail
  // );
  console.log(quotationDetails, "details table comp");

  const {
    createDate,
    creator,
    details,
    email,
    name,
    id,
    phoneNumber,
    quotationDate,
  } = quotationDetails;

  return (
    <>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col">
          <div className="text-xl font-extrabold">{creator?.name}</div>
          <span className="text-sm">
            {"Bussiness Number (021) 456 789 321"}
          </span>
          <span className="text-sm">
            {"Shahrah-e-Faisal Rd, Block 6 PECHS"}
          </span>
          <span className="text-sm">Karachi</span>
          <span className="text-sm">72500</span>
          <span className="text-sm">{phoneNumber}</span>
          <span className="text-sm">Karachi</span>
          <span className="text-sm">{email}</span>
        </div>
        <div className="flex flex-col text-end justify-evenly">
          <div className="font-bold text-sm">CODE</div>
          <span className="text-sm">ITM-00006</span>
          <div className="font-bold text-sm">DATE</div>
          <span className="text-sm">
            {moment(createDate).format("DD/MM/YYYY")}
          </span>
          <div className="font-bold text-sm">TOTAL</div>
          <span className="text-sm">PKR Rs 14,144,08</span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col">
        <span>To</span>
        <div className="text-xl font-extrabold">{name}</div>
        <span className="text-sm">F23 Defence View Housing Society</span>
        <span className="text-sm">Karachi</span>
        <span className="text-sm">76784</span>
        <span className="text-sm">{phoneNumber}</span>
        <span className="text-sm">{email}</span>
      </div>

      <div className="mt-6 ">
        {/* <Table dataSource={data} columns={columns} /> */}
        <table className="w-full text-center">
          <tr
            style={{ backgroundColor: "#526bb1", color: "#fff" }}
            // className="decoration-white"
          >
            <th>Description</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Tax</th>
          </tr>{" "}
          {details.map((el, i) => {
            return (
              <tr
                className="text-center text-sm"
                style={{ borderBottom: "0.5px solid rgb(207 199 199 / 85%)" }}
              >
                <td>{el.item}</td>
                <td>{el.price}</td>
                <td>{el.quantity}</td>
                <td>{el.tax}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="mt-4 text-end flex ">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="flex justify-between" style={{ height: "2rem" }}>
            <span className="font-bold">SubTotal</span>
            <span>Rs 911,923.00</span>
          </div>
          <div
            className="flex justify-between"
            style={{
              borderBottom: "0.5px solid rgb(207 199 199 / 85%)",
              height: "2rem",
            }}
          >
            <span className="font-bold">{"Tax(0%)"}</span>
            <span>Rs 0.00</span>
          </div>
          <div
            className="flex justify-between"
            style={{
              borderBottom: "0.5px solid rgb(207 199 199 / 85%)",
              marginTop: "1rem",
              height: "2rem",
            }}
          >
            <span className="font-bold">Total</span>
            <span>Rs 911,923.00</span>
          </div>
        </div>
        {/* <div>
          <span>SubTotal</span>
          <span>Rs 911,923.00</span>
        </div>
        <div>
          <span>{"Tax(0%)"}</span>
          <span>Rs 0.00</span>
        </div>
        <div>
          <span>Total</span>
          <span>Rs 911,923.00</span>
        </div> */}
      </div>
    </>
  );
};

export default QuotationDetail;
