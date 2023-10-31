import { useEffect, useState } from 'react';
import LinkTree from '../../components/linktree/LinkTree';
import { facebookeIcon, youtubeIcon, instagramIcon } from '../../svg/icon';
import './Profile.scss';

import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import SocialIcon from '../../components/SocialIcon/socialIcon';
import { useSelector } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
import { useParams } from 'react-router-dom';

function Profile() {
    // const currentUser = useSelector((state) => state.user.currentUser);
    // const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [user, setUser] = useState({})
    const [theme, setTheme] = useState({})
    let { username } = useParams();
    //fetch user
    useEffect(()=>{ 
        const fectchUser = async()=> {
            const res = await axiosInstance.get(`/users/${username}`)
            setUser(res.data)
        }
        fectchUser()
    },[username])   
    //fetch theme
    useEffect(()=>{ 
        const fectchTheme = async()=> {
            const res = await axiosInstance.get(`/card/v1/${user._id}`) 
            setTheme(res.data)
        }
        fectchTheme()
    },[user._id])


    return (
        <section className="profile">
            <img className='profile-background' src={theme?.backgroundImg} alt="" />
            <div className="profile-info">
                <AvatarProfile
                    username={user.username}
                    usernameTitle={user.usernameTitle}
                    decs={user.decs}
                    avatar={user.avtImg}
                    fontColor={user.font_color}
                />
                <SocialIcon />
                <LinkTree title={'Facebook'} icon={facebookeIcon(35, 35)} link="https://www.facebook.com/" />
                <LinkTree title={'Youtube'} icon={youtubeIcon(35, 35)} link="" />
                <LinkTree title={'Instagram'} icon={instagramIcon(35, 35)} />
            </div>
            {/* <div className="profile-logo">
                <img src="../../../src/assets/img/logo2.png" alt="" />
            </div> */}
        </section>
    );
}

export default Profile;
