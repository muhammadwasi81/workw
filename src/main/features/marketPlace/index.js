import { Routes, Route } from "react-router-dom";

const DATA = () => {
  return <div>dsdsdssddss</div>;
};
const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<DATA />} />
    </Routes>
  );
};

export default Index;
