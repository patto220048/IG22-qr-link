import './LinkTree.scss';
import { menuIcon } from '../../svg/icon';
import { useState, memo } from 'react';
import { useSelector } from 'react-redux';

function LinkTree(props) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <a href={props.link} className="linktree-link" hidden={!props.acticve} target="blank">
            <div
                className="linktree"
                style={{
                    borderRadius: `${currentTheme.btn_radius}px`,
                    boxShadow: `${currentTheme.btn_style?.btn_shadow.horizontal}px ${currentTheme.btn_style?.btn_shadow.vertical}px ${currentTheme.btn_style?.btn_shadow.blur}px ${currentTheme.btn_style?.btn_shadow.spread}px ${currentTheme?.btn_shadow_color}`,
                    width: `${props.preview ? '250px' : '500px'}`,
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
                    <img
                        className="linktree-thumb"
                        src="https://images.unsplash.com/photo-1682685796014-2f342188a635?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
                        alt=""
                    />
                    <p
                        className="linktree-title"
                        style={{ fontFamily: `${currentTheme.font_famify}`,
                                 fontWeight: `${currentTheme.font_weight}` }}
                    >
                        {props.title}
                    </p>

                    <link rel="shortcut icon" href={props.icon} />
                    {/* <span className="linktree-icon_menu">{menuIcon()}</span> */}
                </div>
            </div>
        </a>
    );
}

export default memo(LinkTree);
