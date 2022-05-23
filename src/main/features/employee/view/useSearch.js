import { useEffect, useState } from "react";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import MasterConfig from "../../../../utils/services/MasterConfig";
// const API_PREFIX = "/api/Utility/";

export default function useSearch(query, pageNumber, url, requestType) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);
	const [responseData, setResponseData] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const debouncedQuery = useDebounce(query, 500);
	// console.log("page number", pageNumber);
	// console.log("loading", loading);
	useEffect(() => {
		setData([]);
		if (query.length > 0) {
			setLoading(true);
			setError(false);
		} else {
			setLoading(false);
			setError(false);
		}
	}, [query]);

	const getData = data => {
		let response;
		if (requestType.toLowerCase() === "post") {
			response = MasterConfig[requestType](`${url}`, data).then(res => {
				setResponseData(res.data);
				return res.data;
			});
		}
		if (requestType.toLowerCase() === "get") {
			response = MasterConfig[requestType](
				`${url}?pageNo=${pageNumber}&search=${debouncedQuery}`
			).then(res => {
				setResponseData(res.data);
				return res.data;
			});
		}
		return response;
	};

	useEffect(() => {
		if (debouncedQuery.length > 0) {
			setLoading(true);
			setError(false);
			const data = {
				search: debouncedQuery,
				pageNo: pageNumber,
			};

			let response = getData(data);
			response
				.then(response => {
					if (response.responseCode === 1001) {
						// console.log("response", response.data);
						setData(prevData => {
							return [
								...new Set([...prevData, ...response.data]),
							];
						});
						setHasMore(response.data.length > 0);
						setLoading(false);
					}
				})
				.catch(e => {
					setError(true);
				});
		}
	}, [debouncedQuery, pageNumber]);

	// useEffect(() => {
	// 	setLoading(true);
	// 	setError(false);
	// 	const data = {
	// 		search: debouncedQuery,
	// 		pageNo: pageNumber,
	// 	};

	// 	let response = getData(data);
	// 	response
	// 		.then(response => {
	// 			if (response.responseCode === 1001) {
	// 				// console.log("response", response.data);
	// 				setData(prevData => {
	// 					return [...new Set([...prevData, ...response.data])];
	// 				});
	// 				setHasMore(response.data.length > 0);
	// 				setLoading(false);
	// 			}
	// 		})
	// 		.catch(e => {
	// 			setError(true);
	// 		});
	// }, []);

	return { loading, error, data, hasMore, responseData };
}
