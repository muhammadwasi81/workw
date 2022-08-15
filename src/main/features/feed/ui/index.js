import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer/index";
import "./stylesheet/NewsFeed.css";
import "./stylesheet/EventBox.css";
import Header from "./header";
import PostComposer from "./composer";
import PostsList from "./posts_list";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useContext } from "react";
import { FeedDictionary } from "../localization";
import Scheduler from "../../schedule/view/scheduler";

const NewsFeed = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = FeedDictionary[userLanguage];
  return (
    <TabbableContainer>
      <Header />
      <ContBody style={{ direction: Direction }}>
        <div className="lf-col" style={{ direction: Direction }}>
          <div className="newsFeed">
            <PostComposer />
            <PostsList />
          </div>
        </div>
        <div
          className="rt-col"
          style={{ display: "block", height: "auto", minHeight: "auto" }}
        >
          <div className="schedule" style={{ height: "60%" }}>
            <Scheduler />
          </div>
        </div>
      </ContBody>
    </TabbableContainer>
  );
};

export default NewsFeed;
