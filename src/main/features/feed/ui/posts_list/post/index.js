import "./stylesheet/Post.css"
import PostHeader from "./views/PostHeader";
import PostSection from "./views/PostSection";
import PostFooter from "./views/PostFooter";

const Post = ({post}) => (
    <div className="post">
        <PostHeader/>
        <PostSection post={post}/>
        <PostFooter/>
    </div>
)

export default Post