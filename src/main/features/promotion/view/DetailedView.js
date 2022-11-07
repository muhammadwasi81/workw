import React, { useContext, useState } from "react";
import { Drawer } from "antd";
import { useMediaQuery } from "react-responsive";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import PromotionDetail from "./PromotionDetail";

function DetailedView(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, promotionDictionary } = promotionDictionaryList[
		userLanguage
	];
	const isTablet = useMediaQuery({ maxWidth: 800 });

	return (
		<Drawer
			title={

				<h1 style={{ fontSize: "20px", margin: 0 }}>
					{promotionDictionary.promotion}
				</h1>
			}
			width="768"
			placement={
				(Direction === "ltr" ? "left" : "right",
				isTablet ? "bottom" : "right")
			}
			onClose={props.onClose}
			visible={props.visible}
			className="detailedViewComposer drawerSecondary"
		>
			<PromotionDetail id={props.id} />
		</Drawer>
	);
}

export default DetailedView;
