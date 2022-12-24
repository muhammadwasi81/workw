import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../../../store/action";
import CourseCard from "../../Components/CourseCard";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";
import ThumbnailSkeleton from "../../UI/thumbnailSkeleton";

function Courses() {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1   })

	const { courses, loader } = useSelector((state) => state.eLearningSlice);

	useEffect(() => {
		dispatch(getAllCourse(filter))
	}, [])

	return (
		<>	
			<div 
				className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"}>
			{   loader ? 
					<ThumbnailSkeleton count={[1,2]} /> :
					courses?.length > 0 ? courses.map((item) => {
					return <CourseCard data={item} />
				}) :  
				!loader && <> <NoDataFound /></>
			}
			</div>
		</>
	);
}

export default Courses;
