import { useSelector } from 'react-redux';
import Background from '../../components/Background/Background';
import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
import { useState, memo, useEffect } from 'react';
import axiosInstance from '../../instance/axiosInstance';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
function Template() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [card, setCard] = useState({});
    const [state, setState] = useState({});
    const [username, setUsername] = useState(null);
    const [desc, setDesc] = useState(null);
    console.log(desc);
    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await axiosInstance.get('/card/v1/');
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
                    <h2 className="tempProfile_title">Profile</h2>
                    <TempProfile setUsername={setUsername} userId={card.userId} setDesc={setDesc} />
                </section>
                <section className="template-item">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme setState={setState} cardId={card._id} />
                </section>
                <section className="template-item">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background />
                </section>
            </div>
            <div className="template-right">
                <div className="template-right-wapper">
                    <img className="template-bg" src={currentTheme.backgroundImg} alt="" />
                    <div className="template-profile">
                        <AvatarProfile
                            username={currentUser.username}
                            usernameTitle={currentUser.usernameTitle}
                            decs={currentUser.decs}
                            avatar={currentUser.avtImg}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Template);
