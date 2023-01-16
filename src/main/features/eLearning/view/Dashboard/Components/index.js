import Nodata from "../../../../../../content/NewContent/eLearning/Nodata.svg";

export const NoDataFound = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={Nodata}
        alt="no-data"
        loading="lazy"
        className="h-[130px] w-[130px] mt-[30px]"
      />
    </div>
  );
};
