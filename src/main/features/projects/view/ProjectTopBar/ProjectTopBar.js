import { useState } from 'react';
import TopBar from '../../../../sharedComponents/topBar/topBar';

function ProjectTopBar({ handleView, topBar, handleSearch }) {
  const [tableView, setTableView] = useState(false);
  handleView(tableView);
  return (
    <TopBar
      onSearch={(value) => {
        handleSearch(value);
      }}
      segment={{
        onSegment: (value) => {
          if (value === topBar.table) {
            setTableView(true);
          } else {
            setTableView(false);
          }
        },
        label1: topBar.list,
        label2: topBar.table,
      }}
    />
  );
}

export default ProjectTopBar;
