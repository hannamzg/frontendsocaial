import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import {makeRequests} from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Upadate from "../../components/update/Update.jsx";

const Profile = () => {

  const [openUpdate,setOpenUpdate] =useState(false)
 
  const {currentUser} = useContext(AuthContext)

  const userId = parseInt(useLocation().pathname.split("/")[2])
  const { isLoading, error, data } = useQuery(['user'], ()=>

  makeRequests.get("/users/find/"+userId).then((res)=>{
    return res.data
  }))

  const {isLoading:rIsLoading,  data:relationshipData } = useQuery(['relationship'], ()=>

  makeRequests.get("/relationships?followedUserId="+userId).then((res)=>{
    return res.data
  }))
  

  const queryClient = useQueryClient()


  const mutation = useMutation((following)=>{
    if(following) return makeRequests.delete("/relationships?userId="+userId)
    makeRequests.post("/relationships",{userId})
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"])
    },
  })

  function handleFollow(){
    mutation.mutate(relationshipData.includes(currentUser.id))
  }
  {console.log(data)}

  return (
    <div className="profile">
      <div className="mid">
      <div className="images">
      <img src={data&&"/upload/"+data.coverPic} alt="" className="cover" />
      <img src={data&&"/upload/"+data.profilePic} alt="" className="profilePic" />  
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data&&data.username}</span> 
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data&&data.city}</span> 
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            {rIsLoading ?"loading":userId ===currentUser.id? <button onClick={()=> setOpenUpdate(true)}>update</button>: <button onClick={handleFollow}>{relationshipData.includes(currentUser.id)?"Following":"follow"}</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId={userId}/>
      </div>
    {openUpdate&& <Upadate setOpenUpdate={setOpenUpdate} user={data}/>}
      </div>
   
    </div>
  );
};

export default Profile;
