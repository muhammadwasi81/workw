import React from "react";
import Tab from "../../../../sharedComponents/Tab";
const { TabPane } = Tab;

function CandidateListView(props) {
  const panes = [
    {
      featureId:0,
      featureName: `Applicants`,
      content: <div>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
        <h1>jkdsjksdjkdjks</h1>
      </div>,
    },
    {
      featureId:1,
      featureName: `Short Listed`,
      content: <div>Information div</div>,
    },
    {
      featureId:2,
      featureName: `Rejected`,
      content: <div>Information div</div>,
    },
    {
      featureId:3,
      featureName: `Completed`,
      content: <div>Information div</div>,
    },
    {
      featureId:4,
      featureName: `Finalist`,
      content: <div>Information div</div>,
    },
    {
      featureId:5,
      featureName: `May be`,
      content: <div>Information div</div>,
    }
  ];
  return (
    <div className="_candidateList">
      <Tab panes={panes} />
    </div>
  );
}

export default CandidateListView;