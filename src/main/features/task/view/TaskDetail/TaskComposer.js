import React, { useContext } from "react";
import { Drawer } from "antd";
import "../style/task.css";
import TaskDetail from "./TaskDetail";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { taskDictionary } from "../../localization";

function TaskDetailDrawer(props) {
	const { visible, onClose, id } = props;
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
	const { labels } = taskDictionaryList;
	return (
		<Drawer
			title={
				<h1
					style={{
						fontSize: "20px",
						margin: 0,
						textAlign: Direction === "ltr" ? "" : "end",
					}}
				>
					{labels.taskDetail}
				</h1>
			}
			placement={Direction === "ltr" ? "right" : "left"}
			width={768}
			onClose={() => {
				onClose();
			}}
			visible={visible}
			destroyOnClose={true}
			className="drawerSecondary"
		>
			<TaskDetail id={id} />
		</Drawer>
	);
}

export default TaskDetailDrawer;
