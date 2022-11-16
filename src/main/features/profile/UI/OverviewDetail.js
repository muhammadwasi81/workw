function OverviewDetail({ icon, text, heading }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-[26px]">{icon}</div>
      <div className="flex items-center">
        <p className="!m-0">{heading}</p> &nbsp;
        <p className="!m-0 text-base text-black">{text}</p>
      </div>
    </div>
  );
}

export default OverviewDetail;
