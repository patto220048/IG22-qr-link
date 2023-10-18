import { useEffect, useState } from 'react';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import LinkTree from '../../components/linktree/LinkTree';
import { facebookeIcon, youtubeIcon, instagramIcon } from '../../svg/icon';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
import SocialIcon from '../../components/SocialIcon/socialIcon';
import { useParams } from 'react-router-dom';

function Profile() {
    const currentUser = useSelector((state)=> state.user.currentUser)
    const [user, setUser] = useState({})
    const [Isloading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(`users/${currentUser.username}`);
                setUser(res.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.message)
            }
            if(Isloading)
            {
                <>loading...</>
            }
        };
        fetchUser()
    }, []); 
    return (
        <section className="profile">
            <div className="profile-info">
                <AvatarProfile usernameTitle = {user.usernameTitle} decs={user.decs} avatar={user.avtImg}/>
                <SocialIcon />
                <LinkTree title={'Facebook'} icon={facebookeIcon(35, 35)} />
                <LinkTree title={'Youtube'} icon={youtubeIcon(35, 35)} />
                <LinkTree title={'Instagram'} icon={instagramIcon(35, 35)} />
            </div>
            {/* <div className="profile-logo">
                <img src="../../../src/assets/img/logo2.png" alt="" />
            </div> */}
        </section>
    );
}

export default Profile;
