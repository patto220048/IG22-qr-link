import { useSelector } from 'react-redux';
import './PreView.scss';
import AvatarProfile from '../avatarProfile/AvatarProfile';
import SocialIconList from '../SocialIconlist/SocialIconList';
import LinkTree from '../linktree/LinkTree';
import Loading from '../dialog/loading/Loading';
import { facebookIcon, instagramIcon, youtubeIcon } from '../../svg/social';

function PreView() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const themeLoading = useSelector((state) => state.theme.loading);
    return (
        <div className="PreView">
            <div className="PreView-wapper">
                    {themeLoading ? (
                        <Loading isLoading={themeLoading} templateLoading={true} />
                    ) : (
                        <>
                            {currentTheme?.backgroundImg ? (
                                <img
                                    className="template-bg"
                                    src={currentTheme.backgroundImg}
                                    alt={currentTheme.backgroundImg}
                                />
                            ) : (
                                <div
                                    className="template-bg"
                                    style={{ backgroundColor: `${currentTheme.bgColor}` }}
                                />
                            )}
                            <section className="template-profile">
                                <AvatarProfile
                                    preview={true}
                                    username={currentUser.username}
                                    usernameTitle={currentUser.usernameTitle}
                                    decs={currentUser.decs}
                                    avatar={currentUser.avtImg}
                                    fontColor={currentTheme.font_color}
                                />

                                <SocialIconList icons={currentTheme.icons} />

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
    );
}

export default PreView;
