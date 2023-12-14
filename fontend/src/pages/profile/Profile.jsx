import { useEffect, useState } from 'react';
import LinkTree from '../../components/linktree/LinkTree';
import './Profile.scss';
import AvatarProfile from '../../components/AvatarProfile/AvatarProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/dialog/loading/Loading';
// import { useQuery } from 'react-query';
import http from '../../instance/axiosInstance';
import SocialIconList from '../../components//SocialIconlist/SocialIconList';
// import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';
import { themeSuccess, updateTheme } from '../../redux-toolkit/themeSlice';
import { loginSuccess, updateData } from '../../redux-toolkit/userSlice';
import { urlSuccess } from '../../redux-toolkit/UrlSlice';
import { iconSuccess } from '../../redux-toolkit/iconSlice';
function Profile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const currentLink = useSelector((state) => state.url.currentUrl);
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState({});
    const [icons, setIcons] = useState([]);
    // const [links, setLinks] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    let { username } = useParams();

    //fetch user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeOutId = setTimeout(async () => {
                    const userData = await http.get(`/users/${username}`);
                    const themeData = await http.get(`/card/v1/${currentUser._id}`);
                    const iconData = await http.get(`/icon/${currentUser._id}`);
                    const linksData = await http.get(`/link/${currentTheme._id}`);
                    const [resultUser, resultTheme, resultIcon, resultLinks] = await Promise.all([
                        userData,
                        themeData,
                        iconData,
                        linksData,
                    ]);
                    dispatch(updateData(resultUser.data));
                    dispatch(updateTheme(resultTheme.data));
                    dispatch(urlSuccess(resultLinks.data))
                    setUser(resultUser.data);
                    setTheme(resultTheme.data);
                    setIcons(resultIcon.data);
                    // setLinks(resultLinks.data);
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
    }, [username, currentUser._id, currentTheme?._id]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const timeOutId = setTimeout(async () => {
    //                 const userData = await http.get(`/users/${username}`);
    //                 setUser(userData.data);
    //                 dispatch(loginSuccess(userData.data));
    //                 setIsLoading(false);
    //             }, 1000);
    //             return () => {
    //                 clearTimeout(timeOutId);
    //             };
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, [username]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const timeOutId = setTimeout(async () => {
    //                 const iconData = await http.get(`/icon/${currentUser._id}`);
    //                 setIcons(iconData.data);
    //                 dispatch(iconSuccess(iconData.data));
    //                 setIsLoading(false);
    //             }, 1000);
    //             return () => {
    //                 clearTimeout(timeOutId);
    //             };
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, [currentUser._id]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const timeOutId = setTimeout(async () => {
    //                 const themeData = await http.get(`/card/v1/${currentUser._id}`);
    //                 setTheme(themeData.data);
    //                 dispatch(themeSuccess(themeData.data));
    //                 setIsLoading(false);
    //             }, 1000);
    //             return () => {
    //                 clearTimeout(timeOutId);
    //             };
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, [currentUser._id]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const timeOutId = setTimeout(async () => {
    //                 const linksData = await http.get(`/link/${currentTheme?._id}`);
    //                 setLinks(linksData.data);
    //                 dispatch(urlSuccess(linksData.data));
    //                 setIsLoading(false);
    //             }, 1000);
    //             return () => {
    //                 clearTimeout(timeOutId);
    //             };
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, [theme?._id]);
    return (
        <section className="profile">
            {isLoading ? (
                <Loading isLoading={isLoading} profileLoading={true} />
            ) : (
                <>
                    {theme?.backgroundVideo || theme?.backgroundImg ? (
                        <>
                            {theme?.backgroundVideo ? (
                                <>
                                    <video
                                        className="profile-background"
                                        type="video/webm"
                                        loop
                                        autoPlay
                                        src={theme?.backgroundVideo}
                                    ></video>
                                </>
                            ) : (
                                <img
                                    className="profile-background"
                                    src={theme?.backgroundImg}
                                    alt={theme?.backgroundImg}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {theme?.gadientColorBot || theme?.gadientColorTop ? (
                                <>
                                    {theme?.gadientColorBot && theme?.gadientColorTop ? (
                                        <div
                                            className="profile-background"
                                            style={{
                                                backgroundImage: `linear-gradient(${theme?.gadientColorTop},${theme?.gadientColorBot})`,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="profile-background"
                                            style={{
                                                backgroundColor: `${theme?.gadientColorTop || theme?.gadientColorBot}`,
                                            }}
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
                        {currentLink?.map((url, index) => (
                            <LinkTree title={url.urlTitle} icon={url.urlThumbnail} link={url.url} key={index} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Profile;
