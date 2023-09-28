
import Avatar from "../../components/avatar/Avatar";
import LinkTree from "../../components/linktree/LinkTree";
import { facebookeIcon, youtubeIcon, instagramIcon } from "../../svg/icon";
import "./Profile.scss"

function Profile() {
    return ( 
        <div className="profile" style={{
            backgroundImage:"url(../../../src/assets/img/33.jpg)"
            }}>
            <div className="profile-info">
                <Avatar/>
                <LinkTree title={"Facebook"} icon={facebookeIcon(35,35)}/>
                <LinkTree title={"Youtube"} icon={youtubeIcon(35,35)}/>
                <LinkTree title={"Instagram"} icon={instagramIcon(35,35)}/>
               
            </div>
            
        </div> 
    );
}

export default Profile;