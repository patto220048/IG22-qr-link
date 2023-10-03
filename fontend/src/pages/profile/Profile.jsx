import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import LinkTree from '../../components/linktree/LinkTree';
import { facebookeIcon, youtubeIcon, instagramIcon } from '../../svg/icon';
import './Profile.scss';

function Profile() {
    const bg_img = true;
    return (
        <div
            className="profile"
            style={
                bg_img
                    ? {
                        backgroundImage: 'url(../../../src/assets/img/img1.jpg)',
                      }
                    : { backgroundColor: 'white',
                        }
            }
        >
            <div className="profile-info">
                <AvatarProfile bg_img = {bg_img} />
                <LinkTree title={'Facebook'} icon={facebookeIcon(35, 35)} />
                <LinkTree title={'Youtube'} icon={youtubeIcon(35, 35)} />
                <LinkTree title={'Instagram'} icon={instagramIcon(35, 35)} />
           
                
       
            </div>
            {/* <div className="profile-logo">
                <img src="../../../src/assets/img/logo2.png" alt="" />
            </div> */}
        </div>
    );
}

export default Profile;
