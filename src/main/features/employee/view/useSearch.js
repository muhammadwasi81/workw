import { useEffect, useState } from "react";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
const API_PREFIX = "/konnectapi/api/Utility/";

export default function useSearch(query, pageNumber, url, requestType) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);
	const [responseData, setResponseData] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const debouncedQuery = useDebounce(query, 500);
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

	useEffect(() => {
		if (debouncedQuery.length > 0) {
			setLoading(true);
			setError(false);
			const data = {
				search: debouncedQuery,
				pageNo: pageNumber,
			};
			const response = AxiosConfig[requestType](
				`${API_PREFIX + url}`,
				data
			).then(res => {
				setResponseData(res.data);
				return res.data;
			});
			response
				.then(response => {
					if (response.message === "success") {
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

	return { loading, error, data, hasMore, responseData };
}
