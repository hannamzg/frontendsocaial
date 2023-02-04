import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

const Home = () => {
  return (
    <div className="home" >
      <div className="mid">
        <Share/>
        <Posts/>
      </div>
      
    </div>
  )
}

export default Home