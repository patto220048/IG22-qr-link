import './LinkTree.scss';
import { menuIcon } from '../../svg/icon';
import { useState, memo } from 'react';
import { useSelector } from 'react-redux';

function LinkTree(props) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <a href={props.link} className="linktree-link">
            <div
                className="linktree"
                style={{
                    borderRadius: `${currentTheme.btn_radius}px`,
                    boxShadow: `${currentTheme.btn_style?.btn_shadow.horizontal}px ${currentTheme.btn_style?.btn_shadow.vertical}px ${currentTheme.btn_style?.btn_shadow.blur}px ${currentTheme.btn_style?.btn_shadow.spread}px ${currentTheme?.btn_shadow_color}`,
                    width: `${props.preview ? '230px' : '500px'}`,
                    border: `${currentTheme.btn_border}px solid black`,
                    backgroundColor: `${currentTheme?.btn_outline ? 'transparent' : `${currentTheme?.btn_color1}`}`,
                }}
            >
                <div
                    className="linktree-item"
                    style={{
                        color: `${currentTheme.btn_fontColor}`,
                    }}
                >
                    <p className="linktree-title">{props.title}</p>
                    <link rel="shortcut icon" href={props.icon} />
                    {/* <span className="linktree-icon_menu">{menuIcon()}</span> */}
                </div>
            </div>
        </a>
    );
}

export default memo(LinkTree);
