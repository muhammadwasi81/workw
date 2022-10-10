const AssetsFooter = ({ dr, cr }) => {
  return (
    <div className="flex items-center">
      <div className="totalAmountItem flex mx-5">
        <div className="totalAmountLabel">Difference : </div>
        <div className="totalAmountValue">{(dr - cr).toFixed(2)}</div>
      </div>
    </div>
  );
};
export default AssetsFooter;
