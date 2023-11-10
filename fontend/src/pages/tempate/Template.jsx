import { useSelector } from 'react-redux';
import Background from '../../components/Background/Background';
import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
import { useState, memo, useEffect } from 'react';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import SocialIcon from '../../components/SocialIconlist/SocialIconList';
import LinkTree from '../../components/linktree/LinkTree';
import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';
// import useFetch from '../../hooks/useFetch';
import Loading from '../../components/dialog/loading/Loading';
import http from '../../instance/axiosInstance';
import SocialIconList from '../../components/SocialIconlist/SocialIconList';
import PreView from '../../components/Preview/PreView';

function Template() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [card, setCard] = useState({});
    // const [icons, setIcons] = useState([]);
    // const [state, setState] = useState({});
    // const [username, setUsername] = useState(null);
    // const [desc, setDesc] = useState(null);
    // console.log(desc);
    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await http.get(`/card/v1/${currentUser._id}`);
                setCard(res.data);
                console.log(res.status);
            } catch (error) {
                console.log(error.message);
            }
        };
        getCard();
    }, []);
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
                    <TempProfile />
                </section>
                <section className="template-item" id="#theme">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme cardId={card._id} />
                </section>
                <section className="template-item" id="#backgound">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background cardId={card._id} />
                </section>
            </div>
            <div className="template-right">
                <PreView/>
            </div>
        </div>
    );
}

export default memo(Template);
