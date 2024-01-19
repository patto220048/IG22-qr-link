import './LinkTree.scss';
import { useState, memo } from 'react';
import { useSelector } from 'react-redux';

function LinkTree(props) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const handleOpenContact = ()=>{
        !props.link && props.setIsContact(true);
    }
    return (
        <>
            <a href={props.link} className="linktree-link" hidden={!props.acticve} target="blank" onClick={handleOpenContact}>
                <p
                    className="linktree-decs"
                    style={{ color: `${currentTheme?.font_color}`, fontFamily: `${currentTheme?.font_famify}` }}
                >
                    {props.decs}
                </p>
                <div
                    className="linktree"
                    style={{
                        borderRadius: `${currentTheme?.btn_radius}px`,
                        boxShadow: `${currentTheme.btn_style?.btn_shadow.horizontal}px ${currentTheme.btn_style?.btn_shadow.vertical}px ${currentTheme.btn_style?.btn_shadow.blur}px ${currentTheme.btn_style?.btn_shadow.spread}px ${currentTheme?.btn_shadow_color}`,
                        width: `${props.preview ? '250px' : '500px'}`,
                        border: `${currentTheme?.btn_border}px solid black`,
                        backgroundColor: `${currentTheme?.btn_outline ? 'transparent' : `${currentTheme?.btn_color1}`}`,
                    }}
                    hidden={props.headerStyte ? true : false}
                >
                    <div
                        className="linktree-item"
                        style={{
                            color: `${currentTheme?.btn_fontColor}`,
                        }}
                    >
                        {props.thumbnailImage ? (
                            <img
                                className="linktree-thumb"
                                src={props.thumbnailImage}
                                alt=""
                                loading="lazy"
                                style={props.thumbnailImage ? { position: 'absolute' } : { position: '' }}
                            />
                        ) : (
                            <></>
                        )}

                        <p
                            className="linktree-title"
                            style={{
                                fontFamily: `${currentTheme?.font_famify}`,
                                fontWeight: `${currentTheme?.font_weight}`,
                            }}
                        >
                            {props.title}
                        </p>

                        <link rel="shortcut icon" href={props.icon} />
                        {/* <span className="linktree-icon_menu">{menuIcon()}</span> */}
                    </div>
                </div>
            </a>
        </>
    );
}

export default memo(LinkTree);
