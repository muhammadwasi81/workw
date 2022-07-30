import React, { useContext } from "react";
import { Table } from "antd";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";

function CustomTable(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	return (
		<Table
			{...props}
			className={`custom_table ${Direction}`}
			rowClassName={"cursor-pointer"}
		/>
	);
}

export default CustomTable;
