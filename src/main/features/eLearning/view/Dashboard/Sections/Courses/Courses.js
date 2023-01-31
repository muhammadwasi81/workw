import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../../../store/action";
import CourseCard from "../../Components/CourseCard";
import { NoDataFound } from "../../../../../../sharedComponents/NoDataIcon";
import ThumbnailSkeleton from "../../UI/thumbnailSkeleton";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { GetCourseByUserId } from "../../../../../profile/store/action";

function Courses() {
	const param = useParams()
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({ pageNo: 1, pageSize: 20, search: "", sortBy: 1   })

	const { 
		loaders, 
		courses
	} = useSelector((state) => 
		state.eLearningSlice)
	let loading = loaders.courseLoading;

	useEffect(() => {
		if (param.id) {
			dispatch(GetCourseByUserId(param.id))
		} else {
			dispatch(getAllCourse(filter))
		}
	}, [])

	return (
		<div className="coursListing">	
			<div 
				className={loading || courses?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2" : !loading && ""}>
			{   loading ? 
					<ThumbnailSkeleton count={[1,2]} /> :
					courses?.length > 0 ? courses.map((item) => {
					return <CourseCard data={item} />
				}) :  
				!loading && <> <NoDataFound /></>
			}
			</div>
		</div>
	);
}

export default Courses;
