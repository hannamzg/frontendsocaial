import Post from "../post/Post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
import {makeRequests} from "../../axios"

const Posts = () => {
  //TEMPORARY
  const { isLoading, error, data } = useQuery(['posts'], ()=>

   makeRequests.get("/posts").then((res)=>{
    return res.data
   })
  )   

  
  return <div className="posts">
  {error?"somthing went worng!":
  isLoading?
  "loading":
  data.map((post)=> <Post post={post} key={post.id}/>)}
  </div>;
};

export default Posts;
