import "./Background.scss"
import backgounds from "../../themes/background"
import Theme from '../Theme/Theme';
import { memo } from "react";
function Background({cardId}) {


    return (    
        <div className="bgTheme">
            <div className="bgTheme-items">
                {backgounds.map((bg, i) => (
                    <Theme 
                    cardId={cardId}
                    isBg={true}
                    backgoundMode ={true} 
                    bgColor = {bg.backgroundColor}
                    key={i} />
                ))}
            </div>
        </div>
    );
}

export default memo(Background);
