import { useEffect, useState } from 'react';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import LinkTree from '../../components/linktree/LinkTree';
import { facebookeIcon, youtubeIcon, instagramIcon } from '../../svg/icon';
import './Profile.scss';

import SocialIcon from '../../components/SocialIcon/socialIcon';
import { useSelector } from 'react-redux';


function Profile() {
    const currentUser = useSelector((state)=> state.user.currentUser)
    console.log(currentUser)
    return (
        <section className="profile">
            <div className="profile-info">
                <AvatarProfile usernameTitle = {currentUser.usernameTitle} decs={currentUser.decs} avatar={currentUser.avtImg}/>
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
