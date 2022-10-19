const AssetsFooter = ({ total }) => {
  return (
    <div className="flex items-center">
      <div className="totalAmountItem flex mx-5">
        <div className="totalAmountLabel">Total&nbsp;: </div>
        <div className="totalAmountValue">{total}</div>
      </div>
    </div>
  );
};
export default AssetsFooter;
