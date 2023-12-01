import { useEffect, useState } from 'react';
import LinkTree from '../../components/linktree/LinkTree';
import './Profile.scss';
import AvatarProfile from '../../components/AvatarProfile/AvatarProfile';
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
    const [isLoading, setIsLoading] = useState(true);
    let { username } = useParams();
    //fetch user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeOutId = setTimeout(async () => {
                    const userData = await http.get(`/users/${username}`);
                    const themeData = await http.get(`/card/v1/${user._id}`);
                    const iconData = await http.get(`/icon/${user._id}`);
                    const [resultUser, resultTheme, resultIcon] = await Promise.all([userData, themeData, iconData]);
                    setUser(resultUser.data);
                    setTheme(resultTheme.data);
                    setIcons(resultIcon.data);
                    setIsLoading(false);
                }, 1000);
                return () => {
                    clearTimeout(timeOutId);
                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [username, user._id]);

    return (
        <section className="profile">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <>
                    {theme?.backgroundImg ? (
                        <img className="profile-background" src={theme?.backgroundImg} alt="" />
                    ) : (
                        <>
                            {theme?.gadientColorBot || theme?.gadientColorTop ? (
                                <>
                                    {theme?.gadientColorBot && theme?.gadientColorTop ? (
                                        <div
                                            className="profile-background"
                                            style={{ backgroundImage: `linear-gradient(${theme?.gadientColorTop},${theme?.gadientColorBot})`}}
                                        />
                                    ) : (
                                        <div
                                            className="profile-background"
                                            style={{ backgroundColor: `${theme?.gadientColorTop || theme?.gadientColorBot }` }}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="profile-background" style={{ backgroundColor: `${theme?.bgColor}` }} />
                            )}
                        </>
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
