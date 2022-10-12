import { Avatar, List } from "antd";
import VirtualList from "rc-virtual-list";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { getNameForImage } from "../../../utils/base";

const ContainerHeight = "400";

const itemMemberType = {
	1: "Employee",
	2: "Admin",
	3: "Sub Head Of Department",
};
const MemberList = props => {
	// console.log("props.data", props.data);
	return (
		<List>
			<VirtualList
				className="MemberList"
				data={props.data}
				height={ContainerHeight}
				itemHeight={47}
				itemKey="email"
				// onScroll={onScroll}
			>
				{(item, index) => (
					<List.Item key={item.member.id}>
						<List.Item.Meta
							avatar={
								<Avatar
									src={item.member.image}
									className="!bg-black"
								>
									{getNameForImage(item.member.name)}
								</Avatar>
							}
							title={<span>{item.member.name}</span>}
							description={item.member.email}
						/>
						<div
							style={{
								color: "var(--currentThemeColor)",
								fontWeight: 700,
							}}
						>
							{itemMemberType[item.memberType]}
						</div>
						<div className="IconDiv">
							<CloseCircleOutlined
								className="text-xl"
								onClick={() => props.onRemove(item, index)}
							/>
						</div>
					</List.Item>
				)}
			</VirtualList>
		</List>
	);
};

export default MemberList;
