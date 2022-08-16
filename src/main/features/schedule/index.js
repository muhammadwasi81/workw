import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import "./styles/style.css";
import Header from "./components/header";
import Calendar from "./view/calendar";

function Schedules() {
  return (
    <TabbableContainer>
      <Header />
      <ContBody style={{ display: "block" }}>
        <Calendar />
      </ContBody>
    </TabbableContainer>
  );
}

export default Schedules;
