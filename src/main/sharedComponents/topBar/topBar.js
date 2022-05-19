import React from "react";
// import { dictionaryList } from "../../../utils/localization/languages";
// import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { Row, Col } from "antd";
import SearchInput from "../searchBox/SearchInput";
import { SearchOutlined } from "@ant-design/icons";
import "./style.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const TopBar = ({ buttons, gridIcons }) => {
	// const { userLanguage } = useContext(LanguageChangeContext);
	// const { sharedLabels, Direction } = dictionaryList[userLanguage];

	const [fullWidth, setFullWidth] = useState(false);

	const isTablet = useMediaQuery({ maxWidth: 800 });

	const handleWidth = () => {
		setFullWidth(true);
	};

	return (
		<>
			<div className="mt-3.5 p-2 rounded bg-white sm:w-99p md:w-90p lg:w-92p xl:w-full ">
				<Row>
					<Col span={isTablet ? 18 : 6} className="inner">
						{/* width50 */}
						<div
							className={fullWidth ? "searchBox" : "searchBox"}
							onClick={handleWidth}
						>
							<SearchInput
								style={{
									backgroundColor: "#F4F4F4",
									border: "1px solid #1A5669",
									height: "100%",
								}}
								className="bg-zinc-100 border border-primary-color h-8"
								onChange={e => console.log("hello")}
								onBlur={() => setFullWidth(false)}
								icon={<SearchOutlined />}
								placeholder="Search"
								size="larger"
							/>
						</div>
					</Col>
					{isTablet ? (
						<Col
							span={6}
							className="gridIconColumn"
							style={{
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<div className="gridIcons">{gridIcons}</div>
						</Col>
					) : (
						""
					)}
					<Col span={isTablet ? 24 : 18} className="inner2">
						<Row
							className={
								isTablet ? "forMobile" : "btnRow !h-full"
							}
						>
							<Col span={isTablet ? 24 : 17}>
								<div className="flex gap-3 pl-4 !h-full">
									{buttons}
								</div>
							</Col>
							{isTablet ? (
								""
							) : (
								<Col
									span={7}
									className="gridInner !flex !justify-end"
								>
									<div className="gridIcons w-56">
										{gridIcons}
									</div>
								</Col>
							)}
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default TopBar;
