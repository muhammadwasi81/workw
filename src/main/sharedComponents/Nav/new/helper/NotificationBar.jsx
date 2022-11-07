import React, { useEffect, useState } from "react";
import sunIcon from "../../../../../content/svg/menu/newNavBarIcon/new/dark_mode.svg";
import moonIcon from "../../../../../content/svg/menu/newNavBarIcon/new/light_mode.svg";
import addUser from "../../../../../content/svg/menu/newNavBarIcon/new/add_user.svg";
import search from "../../../../../content/svg/menu/newNavBarIcon/new/search.svg";
import notification from "../../../../../content/svg/menu/newNavBarIcon/new/ring.svg";
import rewards from "../../../../../content/svg/menu/newNavBarIcon/new/check_list.svg";
import stickyNotes from "../../../../../content/svg/menu/newNavBarIcon/new/sticky_notes.svg";
import Notes from "../../../../features/notes/Notes";
import NewStickyNote from "../../../../features/notes/NewStickyNote";
import { toggleStickyNote } from "../../../../features/notes/newStickyNotes/store/stickySlice";
import { setNotificationStatus } from "../../../../../store/appReducer/responsiveSlice";
import { useSelector, useDispatch } from "react-redux";
import {
	disable as disableDarkMode,
	enable as enableDarkMode,
} from "darkreader";
import NotificationModal from "./NavComposer";
import Approvals from "../../../../features/approval/view/SideBarApproval/sideBarAppovals";
import Notifications from "../../../../features/notifiation/view/index";
import OpenImage from "../../../../features/notes/OpenImage";
import StickyContainer from "../../../../features/notes/newStickyNotes/view/components/StickyNotes";
import { Input } from "antd";
// const Approvals = () => {
//   return "Approvals";
// };

function NotificationBar() {
	const [isSearch, setIsSearch] = useState(false);
	const [currentNotification, setCurrentNotification] = useState("");
	const renderModal = {
		["approval"]: <Approvals />,
		["notification"]: <Notifications />,
	};
	const dispatch = useDispatch();
	const [theme, setTheme] = useState(
		window.localStorage.getItem("darkMode") === "1"
	);
	const { navBarStatus, notifcationStatus } = useSelector(
		state => state.responsiveSlice
	);
	const handleSearch = () => {
		setIsSearch(!isSearch);
	};
	const modeHandler = status => {
		if (status) {
			enableDarkMode({
				brightness: 100,
				contrast: 90,
				sepia: 10,
			});
		} else {
			disableDarkMode();
		}
		window.localStorage.setItem("darkMode", status ? "1" : "0");
	};
	const toggleNotification = () => {
		dispatch(setNotificationStatus(false));
		setCurrentNotification("");
	};
	const getCurrentNotification = current => {
		if (current === currentNotification) {
			dispatch(setNotificationStatus(false));
			setCurrentNotification("");
		} else {
			dispatch(setNotificationStatus(true));
			setCurrentNotification(current);
		}
	};
	useEffect(() => {
		setIsSearch(false);
	}, [navBarStatus === false]);

	let classes = "notificationBar ";
	classes += isSearch ? "open" : "";


	// Sticky Note
	const toggleNote = useSelector(state => state.stickySlice.open);

	const stickyNoteHandler = () => {
		dispatch(toggleStickyNote());
	};

	// const incrementStickyNote = useSelector(
	//   (state) => state.newStickySlice.incrementArray
	// );

	const openImg = useSelector(state => state.newStickySlice.openImg);
	// console.log(incrementStickyNote);

	//console.log(closeAllSticky);
	//const closeStickyNote = useSelector((state) => state.stickyNotesSlice.open);
	const [title, setTitle] = useState("");
	const titleVal = titleVal => {
		setTitle(titleVal);
	};

	return (
		<div className={classes}>
			<div className="notiBarIcon" >
				<ul className="list">
					<li className="list__item">
						<img
							alt=""
							src={theme ? sunIcon : moonIcon}
							onClick={() => {
								setTheme(!theme);
								modeHandler(!theme);
							}}
						/>
					</li>
					<li className="list__item">
						<img src={addUser} alt="" />
					</li>
					<li className="list__item">
						<img src={stickyNotes} alt="" onClick={stickyNoteHandler} />
					</li>
					{/* {toggleNote && <Notes stickyNoteTitle={title} />} */}

					<li
						className="list__item"
						onClick={() => {
							getCurrentNotification("notification");
						}} >
						<img src={notification} alt="" />
					</li>
					<li
						className="list__item"
						onClick={() => {
							getCurrentNotification("approval");
						}}
					>
						<img src={rewards} alt="" />
					</li>
				</ul>
				<div className="searchBar" >
					<img src={search} alt="" onClick={handleSearch} className="cursor-pointer" />
				</div>
			</div>
			<NotificationModal
				isVisible={notifcationStatus}
				onClose={toggleNotification}
			>
				{renderModal[currentNotification]}
			</NotificationModal>
			{openImg && <OpenImage />}
			{toggleNote && <StickyContainer />}

		</div>

	);
}

export default NotificationBar;
{/* {incrementStickyNote.map((increment) => (
          <NewStickyNote
            key={increment.id}
            id={increment.id}
            title={increment.title}
            titleVal={increment.titleVal}
            textAreaPlaceholder={increment.textArea_placeholder}
            textAreaValue={
              increment.textArea_value === "Take a Note..."
                ? ""
                : increment.textArea_value
            }
            x_axis={increment.x_axis}
            y_axis={increment.y_axis}
            open={increment.open}
            titleBg={increment.bgColor}
            onGetTitleVal={titleVal}
            img={increment.img}
          />
        ))} */}
