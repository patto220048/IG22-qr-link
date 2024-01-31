import Background from '../../components/Background/Background';
import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
import { useState, memo, useEffect } from 'react';

import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { useDispatch, useSelector } from 'react-redux';
import { urlFail, urlStart, urlSuccess } from '../../redux-toolkit/UrlSlice';
import http from '../../instance/axiosInstance';
import { themeSuccess } from '../../redux-toolkit/themeSlice';
import Fonts from '../../components/Fonts/Fonts';

function Template({ setUserIn, setIsLoading, isLoading, theme, icons, user, setViewMb ,userIn}) {
    const [pickImg, setPickImg] = useState(false);

    return (
        <div className="template">
            <div className="template-left">
                <section className="template-item">
                    <h2 className="tempProfile_title" id="#profile">
                        Profile
                    </h2>
                    <TempProfile
                        userIn={userIn}
                        setUserIn={setUserIn}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        theme={theme}
                        icons={icons}
                        user={user}
                        setPickImg={setPickImg}
                        pickImg={pickImg}
                    />
                </section>
                <section className="template-item" id="#theme">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme cardId={theme?._id} />
                </section>
                <section className="template-item" id="#backgound">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background cardId={theme?._id} theme={theme} setViewMb={setViewMb} setPickImg={setPickImg}/>
                </section>
                <section className="template-item" id="#button">
                    <h2 className="tempProfile_title">Button</h2>
                    <ButtonLink  cardId={theme?._id} theme={theme} user={user}/>
                </section>
                <section className="template-item" id="#button">
                    <h2 className="tempProfile_title">Fonts</h2>
                    <Fonts  theme={theme} />
                </section>
            </div>
        </div>
    );
}

export default memo(Template);
