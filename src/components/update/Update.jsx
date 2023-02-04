import { useState } from "react";
import { makeRequests } from "../../axios";
import "./update.scss";


const Upadate =({setOpenUpdate})=>{

    const [cover,setCover]= useState(null);
    const [profile,setProfile]= useState(null);

    const [texts,setTexts]=useState({
        name:"",
        city:"",
        website:""
    })

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

    const handleChange =(e)=>{
        setTexts((prev)=>({...prev,[e.target.name]:[e.target.value]}))
    }

    return(
        <div className="update">
            Update
            <form>
                <input type="file" />
                <input type="file" />
                <input type="text" name="name"  onChange={handleChange}/>
                <input type="text" name="city"  onChange={handleChange}/>
                <input type="text" name="website"  onChange={handleChange}/>
            </form>
            <button onClick={()=> setOpenUpdate(false)}>X</button>
        </div>
    )
}

export default Upadate