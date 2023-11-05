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

function Template() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const themeLoading = useSelector((state) => state.theme.loading);
    const [card, setCard] = useState({});

    // const [state, setState] = useState({});
    // const [username, setUsername] = useState(null);
    // const [desc, setDesc] = useState(null);
    // console.log(desc);
    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await http.get(`/card/v1/${currentUser._id}`);
                console.log(res.data);
                setCard(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getCard();
    }, []);
    return (
        <div className="template">
            <div className="template-left">
                <section className="template-item">
                    <h2 className="tempProfile_title" id="#profile">Profile</h2>
                    <TempProfile />
                </section>
                <section className="template-item" id="#theme">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme cardId={card._id} />
                </section>
                <section className="template-item" id="#backgound">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background />
                </section>
            </div>
            <div className="template-right">
                <div className="template-right-wapper">
                    {themeLoading ? (
                        <Loading isLoading={themeLoading} templateLoading={true} />
                    ) : (
                        <>
                            <img
                                className="template-bg"
                                src={currentTheme.backgroundImg}
                                alt={currentTheme.backgroundImg}
                            />
                            <section className="template-profile">
                                <AvatarProfile
                                    preview={true}
                                    username={currentUser.username}
                                    usernameTitle={currentUser.usernameTitle}
                                    decs={currentUser.decs}
                                    avatar={currentUser.avtImg}
                                    fontColor={currentTheme.font_color}
                                />

                                <SocialIconList />

                                <LinkTree
                                    preview={true}
                                    title={'Facebook'}
                                    icon={facebookIcon(35, 35)}
                                    link="https://www.facebook.com/"
                                />
                                <LinkTree preview={true} title={'Youtube'} icon={youtubeIcon(35, 35)} link="" />
                                <LinkTree preview={true} title={'Instagram'} icon={instagramIcon(35, 35)} />
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(Template);
