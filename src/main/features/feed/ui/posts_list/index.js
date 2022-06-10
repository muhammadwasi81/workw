import PostItem from "./post/index";
import thor from "./../../../../../content/thor.jpg"
import ballon from "./../../../../../content/ballon.png"

function PostsList() {
    const postList = [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <div className="newsList ">
            {postList.map(() => <PostItem post={{image: [thor, ballon]}}/>)}
        </div>
    )
}

export default PostsList