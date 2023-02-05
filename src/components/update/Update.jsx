import { useState } from "react";
import { makeRequests } from "../../axios";
import "./update.scss";
import {useMutation,useQueryClient} from '@tanstack/react-query'


const Upadate =({setOpenUpdate,user})=>{

    const [cover,setCover]= useState(null);
    const [profile,setProfile]= useState(null);

    const [texts, setTexts] = useState({
        name: user.name,
        username: user.username,
        city: user.city,
        website: user.website,
      });

      async function upload (file) {
        try{
          const fromData =new FormData();
          fromData.append("file",file)
          const res = await makeRequests.post("/upload",fromData)
          return res.data
        }
        catch(err){
          console.log(err);
        }
      }

      const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
      };




      const queryClient = useQueryClient()
    
    
      const mutation = useMutation(
      (user)=>{
        return makeRequests.put("/users",user)
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["user"]);
        },
      })
    
     async function handleClick (e){
        e.preventDefault()
        let coverUrl;
        let profileUrl;


        coverUrl=cover ? await upload(cover):user.coverPic
        profileUrl=profile ? await upload(profile):user.profilePic


        
        mutation.mutate({...texts,coverPic:coverUrl,profilePic:profileUrl})
        setOpenUpdate(false)
      }



    return(
        <div className="update">
          <div className="fromm">
            Update
              <form>
                  <input type="file" onChange={e=>setCover(e.target.files[0])}/>
                  <input type="file" onChange={e=>setProfile(e.target.files[0])}/>
      
            <input
            placeholder="name"
              className="inp"
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            
            <input
            placeholder="user name"
             className="inp"
              type="text"
              value={texts.username}
              name="username"
              onChange={handleChange}
            />
          
            <input
             placeholder="Country / City"
             className="inp"
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />

            <input
            placeholder="Website"
             className="inp"
              type="text"
              name="website"
              value={texts.website}
              onChange={handleChange}
            />
            <button className="upd" onClick={handleClick}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            X
          </button>
          </div>
        </div>
    )
}

export default Upadate