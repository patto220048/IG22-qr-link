import { useEffect, useState } from 'react';
import LinkTree from '../../components/linktree/LinkTree';
import './Profile.scss';

import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/dialog/loading/Loading';
import { useQuery } from 'react-query';
import http from '../../instance/axiosInstance';
import SocialIconList from '../../components//SocialIconlist/SocialIconList';
import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';
function Profile() {
    // const currentUser = useSelector((state) => state.user.currentUser);
    // const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState({});
    const [icons, setIcons] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const isLoading = false;
    let { username } = useParams();
    //fetch user
    useEffect(() => {
        const fectchUser = async () => {
            try {
                const res = await http.get(`/users/${username}`);
                setUser(res.data);
                // setIsLoading(true);
            } catch (error) {
                console.log(error.message);
            }
        };
        fectchUser();
    }, [username]);
    //fetch theme
    useEffect(() => {
        const fectchTheme = async () => {
            try {
                const res = await http.get(`/card/v1/${user._id}`);
                setTheme(res.data);
                console.log(res.data)
                // setIsLoading(true);
            } catch (error) {
                console.log(error.message);
            }
        };
        fectchTheme();
    }, [user._id]);
    //fetch icon
    useEffect(() => {
        const fetchIcon = async () => {
            try {
                const res = await http.get(`/icon/${user._id}`);
                setIcons(res.data);
                // setIsLoading(true);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchIcon();
    }, [user._id]);

    return (
        <section className="profile">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <>
                    {theme?.backgroundImg ? (
                        <img className="profile-background" src={theme?.backgroundImg} alt="" />
                    ) : (
                        <img className="profile-background"  style={{ backgroundColor: `${theme?.bgColor}` }}/> 
                    )}
                    <div className="profile-info">
                        <AvatarProfile
                            username={user.username}
                            usernameTitle={user.usernameTitle}
                            decs={user.decs}
                            avatar={user.avtImg}
                            fontColor={theme?.font_color}
                        />
                        <SocialIconList icons={icons} />
                        <LinkTree title={'Facebook'} icon={facebookIcon(35, 35)} link="https://www.facebook.com/" />
                        <LinkTree title={'Youtube'} icon={youtubeIcon(35, 35)} link="" />
                        <LinkTree title={'Instagram'} icon={instagramIcon(35, 35)} />
                    </div>
                    {/* <div className="profile-logo">
                <img src="../../../src/assets/img/logo2.png" alt="" />
            </div> */}
                </>
            )}
        </section>
    );
}

export default Profile;
