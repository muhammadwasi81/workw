import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { MenuLabel, NavMenuBadge, SideMenuLabel } from "./style/navBar.style";
import NavMenuList from "./navbarMenuList";
import { navBarOpen } from "../../../store/appReducer/responsiveSlice";
import { NavLink, useLocation } from "react-router-dom";
import AntTooltip from "../../SharedComponent/Tooltip/AntTooltip";
import { Badge } from "antd";

const NavMenuListContainer = ({ navbarstatus }) => {
	const { pathname } = useLocation();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { isMobileScreen } = useSelector(state => state.responsiveSlice);
	const dispatch = useDispatch();
	const localDictionary = dictionaryList[userLanguage];
	const NO_RIGHTS = true;
	let { navMenuData, navHrMenuData } = NavMenuList();
	// const [allMenu, setAllMenu] = useState(null);
	// const menuRightsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	// useEffect(() => {
	//     let res = [];
	//     menuRightsData.forEach(value => {
	//         navMenuData.forEach(val => {
	//             if (val.isActive === value) {
	//                 res.push(val);
	//             }
	//         });
	//     });
	//     setAllMenu(res);
	// }, []);

	return (
		<div className="nav-menu">
			{NO_RIGHTS ? (
				<SideMenuLabel
					className="menu-label"
					navbarstatus={navbarstatus}
				>
					{localDictionary.navMenuLabel.menu}
				</SideMenuLabel>
			) : (
				<React.Fragment>
					<SideMenuLabel
						className="menu-label"
						navbarstatus={navbarstatus}
					>
						Administrator
					</SideMenuLabel>
					<SideMenuLabel
						className="menu-label"
						navbarstatus={navbarstatus}
					>
						Please contact your Administrator
					</SideMenuLabel>
				</React.Fragment>
			)}

			{navMenuData &&
				navMenuData.map(({ name, to: path, icon }, index) =>
					navbarstatus ? (
						<div className="menu-item" key={index}>
							<NavLink
								// className={({ isActive }) =>
								// 	"anc" + (isActive ? " on" : "")
								// }
								className={({ isActive }) =>
									"anc" +
									(isActive
										? " on"
										: pathname.split("/")[1] +
												"/" +
												pathname.split("/")[2] ===
										  path.split("/")[1] +
												"/" +
												path.split("/")[2]
										? " on"
										: "")
								}
								to={path}
								// pathname={pathname}
								onClick={() =>
									isMobileScreen &&
									dispatch(navBarOpen(false))
								}
								navbarstatus={"navbarstatus"}
							>
								<div className="icon">
									<img src={icon} alt="#" />
								</div>
								<MenuLabel className="menu-label">
									{name}
									<NavMenuBadge navbarstatus={navbarstatus}>
										<Badge
											className="site-badge-count-109"
											count={0}
											style={{
												backgroundColor: "#F5222D",
												border: "unset",
											}}
										/>
									</NavMenuBadge>
								</MenuLabel>
							</NavLink>
						</div>
					) : (
						<NavLink
							key={index}
							className={({ isActive }) =>
								"anc" +
								(isActive
									? localDictionary.Direction === "rtl"
										? " nav-item-close-StyleRtl"
										: " nav-item-close-StyleLtr"
									: "")
							}
							style={{ padding: "12px 12px" }}
							to={path}
							onClick={() =>
								isMobileScreen && dispatch(navBarOpen(false))
							}
						>
							<AntTooltip
								value={name}
								placement="right"
								color={"#FFFFFF"}
							>
								<Badge
									className="site-badge-count-109"
									count={0}
									dot={true}
								>
									<div
										style={{
											display: "flex",
											width: 24,
											height: 24,
										}}
									>
										<img src={icon} alt="#" />
									</div>
								</Badge>
							</AntTooltip>
						</NavLink>
					)
				)}

			{NO_RIGHTS && (
				<SideMenuLabel
					className="menu-label"
					navbarstatus={navbarstatus}
				>
					{localDictionary.navMenuLabel.hr}
				</SideMenuLabel>
			)}

			{navHrMenuData &&
				navHrMenuData.map(({ name, to: path, icon }, index) =>
					navbarstatus ? (
						<div className="menu-item" key={index}>
							<NavLink
								className={({ isActive }) =>
									"anc" +
									(isActive
										? " on"
										: pathname.split("/")[1] +
												"/" +
												pathname.split("/")[2] ===
										  path.split("/")[1] +
												"/" +
												path.split("/")[2]
										? " on"
										: "")
								}
								to={path}
								onClick={() =>
									isMobileScreen &&
									dispatch(navBarOpen(false))
								}
								navbarstatus={"navbarstatus"}
							>
								<div className="icon">
									<img src={icon} alt="#" />
								</div>
								<MenuLabel className="menu-label">
									{name}
									<NavMenuBadge navbarstatus={navbarstatus}>
										<Badge
											className="site-badge-count-109"
											count={0}
											style={{
												backgroundColor: "#F5222D",
											}}
										/>
									</NavMenuBadge>
								</MenuLabel>
							</NavLink>
						</div>
					) : (
						<NavLink
							key={index}
							className={({ isActive }) =>
								"anc" +
								(isActive
									? localDictionary.Direction === "rtl"
										? "nav-item-close-StyleRtl"
										: "nav-item-close-StyleLtr"
									: "")
							}
							style={{ padding: "12px 12px" }}
							to={path}
							onClick={() =>
								isMobileScreen && dispatch(navBarOpen(false))
							}
						>
							<AntTooltip
								value={name}
								placement="right"
								color={"#FFFFFF"}
							>
								<Badge
									className="site-badge-count-109"
									count={0}
									dot={true}
								>
									<div
										style={{
											display: "flex",
											width: 24,
											height: 24,
										}}
									>
										<img src={icon} alt="#" />
									</div>
								</Badge>
							</AntTooltip>
						</NavLink>
					)
				)}
		</div>
	);
};
export default NavMenuListContainer;
