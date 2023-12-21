import { useDispatch, useSelector } from 'react-redux';
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
import { urlSuccess } from '../../redux-toolkit/UrlSlice';
import { iconSuccess } from '../../redux-toolkit/iconSlice';
import { themeSuccess } from '../../redux-toolkit/themeSlice';
import { loginSuccess } from '../../redux-toolkit/userSlice';

function Template({setUserIn,setIsLoading,isLoading,theme,icons,user}) {
  
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
    
        </div>
    );
}

export default memo(Template);
