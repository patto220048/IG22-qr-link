import { useSelector } from 'react-redux';
import Background from '../../components/Background/Background';
import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
import { useState, memo, useEffect } from 'react';
import http from '../../instance/axiosInstance';
import PreView from '../../components/Preview/PreView';
import { useParams } from 'react-router-dom';

function Template() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [ themeInstance, setThemeInstance ] = useState()
    const [ userIn, setUserIn ] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({});
    const [theme, setTheme] = useState({});
    const [icons, setIcons] = useState([]);
    let { username } = useParams();
    console.log(theme)
    console.log(themeInstance)
    useEffect(() => {
        const fetchData = async () => {
                try {
                    const userData = await http.get(`/users/${username}`);
                    const themeData = await http.get(`/card/v1/${user._id}`);
                    const iconData = await http.get(`/icon/${user._id}`);
                    const [resultUser, resultTheme, resultIcon] = await Promise.all([userData, themeData, iconData]);
                    setUser(resultUser.data);
                    setTheme(resultTheme.data);
                    setIcons(resultIcon.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
        };
        fetchData();
    }, [username, user._id])
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
                    <TempProfile setUserIn={setUserIn} setIsLoading={setIsLoading} isLoading={isLoading} theme={theme} icons={icons} user={user}/>
                </section>
                <section className="template-item" id="#theme">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme cardId={theme._id} setThemeInstance={setThemeInstance}  />
                </section>
                <section className="template-item" id="#backgound">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background cardId={theme._id} />
                </section>
            </div>
            <div className="template-right">
                <PreView themeInstance={themeInstance} userIn={userIn} isLoading={isLoading} theme={theme} icons={icons} user={user}/>
            </div>
        </div>
    );
}

export default memo(Template);
