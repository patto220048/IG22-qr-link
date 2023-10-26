import { useEffect, useState } from 'react';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import LinkTree from '../../components/linktree/LinkTree';
import { facebookeIcon, youtubeIcon, instagramIcon } from '../../svg/icon';
import './Profile.scss';

import SocialIcon from '../../components/SocialIcon/socialIcon';
import { useSelector } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';

function Profile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const {currentTheme} = useSelector((state) => state.theme);
    return (
        <section className="profile" style={{ backgroundImage: `url(${currentTheme.backgroundImg})` }}>
            <div className="profile-info">
                <AvatarProfile
                    username={currentUser.username}
                    usernameTitle={currentUser.usernameTitle}
                    decs={currentUser.decs}
                    avatar={currentUser.avtImg}
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
