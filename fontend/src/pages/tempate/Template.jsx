import { useSelector } from 'react-redux';
import Background from '../../components/Background/Background';
import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
import { useState, memo, useEffect } from 'react';
import http from '../../instance/axiosInstance';
import PreView from '../../components/Preview/PreView';
import { useParams } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { closeIcon } from '../../svg/icon';

function Template({}) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [userIn, setUserIn] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState({});
    const [icons, setIcons] = useState([]);
    const [viewMb, setViewMb] = useState(false);
    let { username } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await http.get(`/users/${username}`);
                const themeData = await http.get(`/card/v1/${currentUser._id}`);
                const iconData = await http.get(`/icon/${currentUser._id}`);
                const [resultUser, resultTheme, resultIcon] = await Promise.all([userData, themeData, iconData]);
                setUser(resultUser.data);
                setTheme(resultTheme.data);
                setIcons(resultIcon.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [username, currentUser._id]);
    // useEffect(() => {
    //     const getIcon = async () => {
    //         try {
    //             const res = await http.get(`/icon/${currentUser._id}`);
    //             setIcons(res.data);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     getIcon();
    // }, []);
    return (
        <div className="template">
            <div className="template-left">
                <section className="template-item">
                    <h2 className="tempProfile_title" id="#profile">
                        Profile
                    </h2>
                    <TempProfile
                        setUserIn={setUserIn}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        theme={theme}
                        icons={icons}
                        user={user}
                    />
                </section>
                <section className="template-item" id="#theme">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme cardId={theme?._id} />
                </section>
                <section className="template-item" id="#backgound">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background cardId={theme?._id} theme={theme} />
                </section>
                <section className="template-item" id="#button">
                    <h2 className="tempProfile_title">Button</h2>
                    <ButtonLink />
                </section>
            </div>
            {viewMb ? (
                <div className="template-right" style={{ display: 'block' }}>
                    <PreView userIn={userIn} isLoading={isLoading} theme={theme} icons={icons} user={user} />
                </div>
            ) : (
                <div className="template-right">
                    <PreView userIn={userIn} isLoading={isLoading} theme={theme} icons={icons} user={user} />
                </div>
            )}
            {!viewMb ? (
                <button className="review-btn" onClick={() => setViewMb(true)}>
                    Preview?
                </button>
            ) : (
                <button className="review-btn close" onClick={() => setViewMb(false)}>
                    {closeIcon(25, 25)}
                </button>
            )}
        </div>
    );
}

export default memo(Template);
