import Nodata from '../../../content/NewContent/eLearning/Nodata.svg';

export const NoDataFound = ({style}) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <img src={Nodata} alt="no-data" loading="lazy" className="h-96 w-96" style={style} />
    </div>
  );
};
