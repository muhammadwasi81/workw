import "./style.css";

const ProjectMiniDashBoard = ({ data }) => {
  return (
    <div className="flex flex-col gap-1 bg-white wrapper">
      <div className="text-base px-2 py-1 bg-white-100 flex justify-between rounded-lg border-b">
        <span className="text-primary-color text-base font-semibold">
          Total Budget
        </span>
        <span className="text-black font-semibold">
          {data?.totalBudget ?? 0}
        </span>
      </div>
      <div className="text-base px-2 py-1 bg-white-100 flex justify-between rounded-lg border-b">
        <span className="text-primary-color text-base font-semibold">
          Balance
        </span>
        <span className="text-black font-semibold">{data?.balance ?? 0}</span>
      </div>
      <div className="text-base px-2 py-1 bg-white-100 flex justify-between rounded-lg border-b">
        <span className="text-primary-color text-base font-semibold">
          Deadline
        </span>
        <span className="text-black font-semibold">
          {data?.totalBudget ?? 0}
        </span>
      </div>
    </div>
  );
};

export default ProjectMiniDashBoard;
