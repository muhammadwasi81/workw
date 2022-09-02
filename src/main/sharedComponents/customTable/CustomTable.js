import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";

function CustomTable(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = dictionaryList[userLanguage];
	const [data, setData] = useState([...props.dataSource]);
	useEffect(() => {
		setData([...props.dataSource]);
	}, [props.dataSource]);

	return (
		<Table
			{...props}
			dataSource={data}
			className={`custom_table ${Direction}`}
			rowClassName={"cursor-pointer"}
			locale={{
				triggerDesc: "",
				triggerAsc: "",
				cancelSort: "",
			}}
		/>
	);
}

export default CustomTable;
