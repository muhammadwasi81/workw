import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import { useMediaQuery } from "react-responsive";
import SharedButton from "../button";
import PropTypes from "prop-types";
import "./sideDrawer.css";
function SideDrawer({
	title,
	buttonText,
	children,
	isDisable,
	isOpen = false,
	handleClose = () => {},
	...props
}) {
	// console.log(isOpen)
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	const [state, setstate] = useState({ visible: false });
	const isTablet = useMediaQuery({ maxWidth: 650 });

	const showDrawer = () => {
		if (props.isAccessDrawer) {
			props.form.resetFields();
		}
		setstate({ ...state, visible: true });
	};
	useEffect(() => {
		setstate({ ...state, visible: isOpen });
	}, [isOpen]);
	useEffect(() => {
		if (props.isAccessDrawer) {
			if (props.openDrawer) {
				showDrawer();
				props.form.resetFields();
			}
		}
	}, [props.openDrawer]);
	useEffect(() => {
		if (props.isAccessDrawer) {
			if (props.success) {
				onClose();
			}
		}
	}, [props.success]);

	const onClose = () => {
		setstate({ ...state, visible: false });
		if (props.isAccessDrawer) {
			props.setOpenDrawer(false);
			props.setIsEdited(false);
			props.form.resetFields();
		}
		handleClose();
	};

	return (
		<>
			{!!!isDisable && (
				<SharedButton
					type="primary"
					onClick={showDrawer}
					shape="square"
					title={buttonText}
					antIcon={<PlusOutlined height={"2em"} />}
					buttonClass={
						Direction === "rtl" && isTablet
							? "drawerBtn justify-start"
							: "drawerBtn"
					}
					IconSize={20}
					style={{
						fontSize: "12px",
					}}
				/>
			)}
			<Drawer
				className={"shared_drawer drawerSecondary"}
				style={
					Direction === "rtl"
						? { textAlign: "right" }
						: { borderTopLeftRadius: "20px" }
				}
				title={title}
				placement={
					isTablet ? "bottom" : Direction === "rtl" ? "left" : "right"
				}
				width={isTablet ? "100%" : 768}
				height={isTablet ? "90%" : "100%"}
				onClose={onClose}
				visible={state.visible}
				bodyStyle={{ paddingBottom: 10 }}
				contentWrapperStyle={
					isTablet && {
						borderTopRightRadius: "20px",
						borderTopLeftRadius: "20px",
						overflow: "hidden",
					}
				}
				// drawerStyle={{ borderTopRightRadius: "20px" }}
				// maskStyle={{ borderTopRightRadius: "20px" }}
				headerStyle={
					isTablet
						? {
								fontSize: "16px",
						  }
						: { fontSize: "22px" }
				}
				destroyOnClose={true}
			>
				{children}
			</Drawer>
		</>
	);
}

export default SideDrawer;
SideDrawer.propTypes = {
	form: PropTypes.shape({
		resetFields: PropTypes.func,
	}),
	resetFields: PropTypes.func,
	setOpenDrawer: PropTypes.func,
	setIsEdited: PropTypes.func,
	openDrawer: PropTypes.func,
	buttonText: PropTypes.string,
	title: PropTypes.string,
	isAccessDrawer: PropTypes.bool,
};

SideDrawer.defaultProps = {
	form: {
		resetFields: () => {},
	},
	setOpenDrawer: undefined,
	setIsEdited: undefined,
	openDrawer: undefined,
	isAccessDrawer: false,
	success: false,
	buttonText: "",
	title: "",
};
