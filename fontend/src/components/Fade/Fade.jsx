import './Fade.scss';
import Template from '../../pages/tempate/Template';
import Links from '../../pages/links/Links';
import PreView from '../Preview/PreView';
import { useEffect, useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../instance/axiosInstance';
import { useParams } from 'react-router-dom';
import { closeIcon } from '../../svg/icon';
import { themeSuccess } from '../../redux-toolkit/themeSlice';
import { urlSuccess } from '../../redux-toolkit/UrlSlice';
function Fade({ onTemplate, onLinks }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    const [userIn, setUserIn] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState({});
    const [icons, setIcons] = useState([]);
    const [links, setLinks] = useState([]);
    let { username } = useParams();
    const [viewMb, setViewMb] = useState(false);
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await http.get(`/users/v1/${currentUser?._id}`);
                const themeData = await http.get(`/card/v1/${currentUser?._id}`);
                const iconData = await http.get(`/icon/${currentUser?._id}`);
                const linkData = await http.get(`/link/${currentUser?._id}`);
                const [resultUser, resultTheme, resultIcon, resultLinks] = await Promise.all([
                    userData,
                    themeData,
                    iconData,
                    linkData,
                ]);
                setUser(resultUser.data);
                setTheme(resultTheme.data);
                setIcons(resultIcon.data);
                setLinks(resultLinks.data);
                dispatch(themeSuccess(resultTheme.data))
                dispatch(urlSuccess(resultLinks.data))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [username, currentUser._id, currentTheme?._id]);
    return (
        <section className="fade-wapper">
            <div className="fade-left">
                {/*------------------left contents--------------------*/}
                {/* Template */}
                {onTemplate && (
                    <Template
                        userIn={userIn}
                        setUserIn={setUserIn}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        theme={theme}
                        user={user}
                        icons={icons}
                        setViewMb={setViewMb}
                    />
                )}
                {/* Links */}
                {onLinks && <Links user={user}/>}
            </div>
            {/* --------------------------------preview----------------------------- */}
            {viewMb ? (
                <div className="fade-right" style={{ display: 'block' }}>
                    <div className="fade-right-items">
                    <PreView isLoading={isLoading} theme={theme} icons={icons} user={user} links={links} />
                    </div>
                </div>
            ) : (
                <div className="fade-right">
                    <div className="fade-right-items">
                        <PreView isLoading={isLoading} theme={theme} icons={icons} user={user} links={links}/>
                    </div>
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
        </section>
    );
}

export default memo(Fade);
<></>;
