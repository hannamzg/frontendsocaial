import { useContext, useEffect } from "react";
import "./comments.scss";
import { AuthContext} from "../../context/authContext";
import {useQuery ,useMutation,useQueryClient} from '@tanstack/react-query'
import {makeRequests} from "../../axios"
import { useState } from "react";
import moment from "moment";

const Comments = ({postId}) => {
  const { currentUser } = useContext(AuthContext);

  const [desc,setDesc]=useState("")


  const { isLoading, error, data } = useQuery(['comments'], ()=>

   makeRequests.get("/comments?postId="+postId).then((res)=>{
    return res.data
   })
  )  


  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newComment)=>{
      return makeRequests.post("/comments",newComment)
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"])
      },
    })
    
   async function handleClick (e){
      e.preventDefault() 
      mutation.mutate({desc,postId:postId})
      setDesc("")
    }
  //Temporary
  
  
  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/"+currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" value={desc} onChange={e=> setDesc(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading? "loading" : data.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
