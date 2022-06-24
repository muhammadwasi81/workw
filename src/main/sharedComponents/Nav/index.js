import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import "./new/style/style.css";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import BusinessLogo from "./new/helper/BusinessLogo";
import ToggleButton from "./new/helper/ToggleButton";
import UserDetails from "./new/helper/UserDetails";
import NotificationBar from "./new/helper/NotificationBar";
import Menu from "./new/helper/Menu";
import NavigationBottom from "./new/helper/NavigationBottom";
import { dictionaryList } from "../../../utils/localization/languages";
import SoundWaves from "../SoundWaves";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setNotificationStatus } from "../../../store/appReducer/responsiveSlice";

const SideNavigation = () => {
	const { navBarStatus } = useSelector(state => state.responsiveSlice);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	const dispatch = useDispatch();
	const isDesktopOrLaptop = useMediaQuery({
		query: "(max-width: 800px)",
	});
	useEffect(() => {
		if (isDesktopOrLaptop) {
			dispatch(setNotificationStatus(false));
		}
	}, [isDesktopOrLaptop]);

	let classes = "sideNavigation ";
	classes += !navBarStatus ? "close" : "open";
	classes += Direction === "ltr" ? "" : " rtl";
	return (
		<div className={classes}>
			<div className="sideNavigation__top">
				<BusinessLogo />
				<ToggleButton />
			</div>
			<div className="sideNavigation__body">
				<UserDetails />
				<NotificationBar />
				<Menu />
			</div>
			<div className="sideNavigation__footer">
				<NavigationBottom />
			</div>
		</div>
	);
};
export default SideNavigation;
