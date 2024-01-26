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
import PreViewContact from '../../components/PreviewContact/PreviewContact';
function Profile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const currentLink = useSelector((state) => state.url.currentUrl);
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState({});
    const [icons, setIcons] = useState([]);
    const [isContact, setIsContact] = useState(false);

    // const [links, setLinks] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    let { username } = useParams();

    //fetch user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await http.get(`/users/${username}`);
                const themeData = await http.get(`/card/v1/${currentUser?._id}`);
                const iconData = await http.get(`/icon/${currentUser?._id}`);
                const linksData = await http.get(`/link/${currentUser?._id}`);
                const [resultUser, resultTheme, resultIcon, resultLinks] = await Promise.all([
                    userData,
                    themeData,
                    iconData,
                    linksData,
                ]);
                const timeOutId = setTimeout(async () => {
                    dispatch(loginSuccess(resultUser.data));
                    dispatch(themeSuccess(resultTheme.data));
                    dispatch(urlSuccess(resultLinks.data));
                    setUser(resultUser.data);
                    setTheme(resultTheme.data);
                    setIcons(resultIcon.data);
                    // setLinks(resultLinks.data);
                    setIsLoading(false);
                }, 500);
                return () => {
                    clearTimeout(timeOutId);
                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [username, currentUser?._id, currentTheme?._id]);
    return (
        <section className="profile">
            {isContact && <PreViewContact setIsContact={setIsContact} preview={false} window={true} />}
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
                                    loading="lazy"
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
                        <div className="profile-info-items">
                            <SocialIconList icons={icons} />
                            {currentLink?.map((url, index) => (
                                <LinkTree
                                    preview={false}
                                    window={true}
                                    isMobile={true}
                                    setIsContact={setIsContact}
                                    title={url.urlTitle}
                                    icon={url.urlThumbnail}
                                    link={url.url}
                                    key={index}
                                    acticve={url.acticve}
                                    thumbnailImage={url.thumbnailImage}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default Profile;
