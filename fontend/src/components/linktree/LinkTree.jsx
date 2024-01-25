import './LinkTree.scss';
import { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { menuIcon } from '../../svg/icon';

function LinkTree(props) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const handleOpenContact = () => {
        !props.link && props.setIsContact(true);
    };

    return (
        <div >
            <a
                href={props.link}
                className="linktree-link"
                hidden={!props.acticve}
                target="blank"
                onClick={handleOpenContact}
                
            >
                <p
                    className="linktree-decs"
                    style={{
                        color: `${currentTheme?.font_color || props.theme?.font_color}`,
                        fontFamily: `${currentTheme?.font_famify || props.theme?.font_famify}`,
                    }}
                >
                    {props.decs}
                </p>
                <div
                    className="linktree"
                    style={{
                        width: `${props.preview ? '250px' : '500px'}`,
                        borderRadius: `${currentTheme?.btn_radius || props.theme?.btn_radius}px`,
                        boxShadow: `${
                            currentTheme.btn_style?.btn_shadow.horizontal ||
                            props.theme?.btn_style?.btn_shadow.horizontal
                        }px ${
                            currentTheme.btn_style?.btn_shadow.vertical || props.theme?.btn_style?.btn_shadow.vertical
                        }px ${currentTheme.btn_style?.btn_shadow.blur || props.theme?.btn_style?.btn_shadow.blur}px ${
                            currentTheme.btn_style?.btn_shadow.spread || props.theme?.btn_style?.btn_shadow.spread
                        }px ${currentTheme?.btn_shadow_color || props.theme?.btn_shadow_color}`,
                        border: `${currentTheme?.btn_border || props.theme?.btn_border}px solid black`,
                        backgroundColor: `${
                            currentTheme?.btn_outline || props.theme?.btn_outline
                                ? 'transparent'
                                : `${currentTheme?.btn_color1 || props.theme?.btn_color1}`
                        }`,
                    }}
                    hidden={props.headerStyte ? true : false}
                >
                    <div
                        className="linktree-item"
                        style={{
                            color: `${currentTheme?.btn_fontColor || props.theme?.btn_fontColor}`,
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
                                fontFamily: `${currentTheme?.font_famify || props.theme?.font_famify   }`,
                                fontWeight: `${currentTheme?.font_weight || props.theme?.font_weigh }`,
                            }}
                        >
                            {props.title}
                        </p>

                        <link rel="shortcut icon" href={props.icon} />
                        <span className="linktree-icon_menu">{menuIcon(25, 25)}</span>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default memo(LinkTree);
