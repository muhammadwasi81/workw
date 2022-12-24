import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "../../../../store/action";
import EbookCard from "../../Components/EbookCard";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";

function Books() {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1, filterType: 1 })

	const { books } = useSelector((state) => state.eLearningSlice);

	console.log(books, "BOOKS")

	useEffect(() => {
		dispatch(getAllBook(filter))
	}, [])

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
				{
					books?.length > 0 ? books.map((item) => {
						return <EbookCard data={item} />
					}) : ""
				}
			</div>
			<div className="flex justify-center">
			{books?.length === 0 ? <NoDataFound /> : ""} 
			</div>
		</>
	);
}

export default Books;

