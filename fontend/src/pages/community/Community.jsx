import CommunityList from "../../components/CommunityList/CommunityList";
import "./Community.scss"

function Community() {

    return ( 
    <div className="Community">
        <h1>Community</h1>
        <div className="Community-wapper">
            <CommunityList/>
        </div>
    </div> 
    );
}

export default Community;