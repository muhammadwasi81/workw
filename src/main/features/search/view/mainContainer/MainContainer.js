import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import EbookCard from "../../../eLearning/view/Dashboard/Components/EbookCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import Post from "../../../feed/ui/posts_list/post";
import BookContainer from "../bookContainer/BookContainer";
import ArticleContainer from "../articleContainer/ArticleContainer";
import CoursesContainer from "../coursesContainer/CoursesContainer";
import EmployeesContainer from "../employeesContainer/EmployeesContainer";
import DocumentContainer from "../documentContainer/DocumentContainer";
import ExpenseContainer from "../expenseContainer/ExpenseContainer";
import GroupContainer from "../groupsConatiner/GroupContainer";
import LeadContainer from "../leadContainer/LeadContainer";
import ProjectContainer from "../projectsContainer/ProjectContainer";
import WorkBoardContainer from "../workBoardContainer/WorkBoardContainer";
import TravelContainer from "../travelContainer/TravelContainer";
import TedTalks from "../tedTalksContainer/TedTalks";
import QuizContainer from "../quizContainer/QuizContainer";
import VideoContainer from "../videosContainer/VideoContainer";
import TaskContainer from "../taskContainer/TaskContainer";
import FeedContainer from "../feedContainer/FeedContainer";
import MenuRoutes from "../../panel/menuRoutes";
// import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { useEffect } from "react";

function toCheck (keyword)
{
  for (const key in keyword) {
    if (keyword.hasOwnProperty(key)) {
      const value = keyword[key];
      // Check if the value is an array
        const length = value.length;
        if(length > 0)
        {
         return true
        }
    }
  }

  return false
}
function MainContainer() {
  const {keyword ,tab}= useSelector((state) => state.globalSearchSlice );
  console.log("keyword",keyword)
  const [isLoading , setLoading] = useState(false);
  
  useEffect(()=>{
    if(toCheck(keyword))
    {
      setLoading(true)
    }
    else
    {
      setLoading(false)
    }
  })

  return (
    <>
        {isLoading == true ? (
        <div style={{overflowY: 'scroll'}}>
        {keyword?.Feed?.length > 0 ?  (tab ==="All"  || tab ==="feed") && <FeedContainer/> : (tab==="feed" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.Lead?.length > 0 ? (tab ==="All"  || tab ==="Lead_Manager") && <LeadContainer/>  : (tab==="Lead_Manager" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.Document?.length > 0 ? (tab ==="All"  || tab ==="Document") && <DocumentContainer/> : (tab==="Document" && <NoDataFound style={{marginLeft: '10rem'}}/>) }
        {keyword?.Project?.length > 0 ? (tab ==="All"  || tab ==="Project") && <ProjectContainer/> : (tab==="Project" && <NoDataFound style={{marginLeft: '10rem'}}/>) }
        {keyword?.WorkBoard?.length > 0 ? (tab ==="All"  || tab ==="Workboard") && <WorkBoardContainer/> : (tab==="Workboard" && <NoDataFound style={{marginLeft: '10rem'}}/>) }
        {keyword?.Group?.length > 0 ? (tab ==="All"  || tab ==="Group") && <GroupContainer/>  : (tab==="Group" && <NoDataFound style={{marginLeft: '10rem'}}/>)} 
        {keyword?.Expense?.length > 0 ? (tab ==="All"  || tab ==="Expense") && <ExpenseContainer/> : (tab==="Expense" && <NoDataFound style={{marginLeft: '10rem'}}/>) }
        {keyword?.Employee?.length > 0 ? (tab ==="All"  || tab ==="Employee") && <EmployeesContainer/>: (tab==="Employee" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.ELearningCourse?.length > 0 ? (tab ==="All"  || tab ==="e_learning_course") &&  <CoursesContainer/>: (tab==="e_learning_course" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.ELearningVideos?.length > 0 ? (tab ==="All"  || tab ==="e_learning_videos") &&  <VideoContainer/> : (tab==="e_learning_videos" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.ELearningArticles?.length > 0 ? ( tab ==="All"  || tab ==="e_learning_article") &&  <ArticleContainer/> : (tab==="e_learning_article" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.ELearningBook?.length > 0 ? (tab ==="All"  || tab ==="e_learning_book") && <BookContainer/> : (tab==="e_learning_book" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
        {keyword?.ELearningTedTalks?.length > 0 ? (tab ==="All"  || tab ==="e_learning_tedTalks") &&  <TedTalks/> : (tab==="e_learning_tedTalks" && <NoDataFound style={{marginLeft: '10rem'}}/>)}
            </div>
          ):(<NoDataFound/>)
        }       
    </>
  );
}
export default MainContainer;
