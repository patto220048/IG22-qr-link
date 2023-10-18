import "./Background.scss"
import backgounds from "../../themes/background"
import Theme from '../Theme/Theme';

function Background() {


    return (    
        <div className="bgTheme">
            <div className="bgTheme-items">
                {backgounds.map((bg, i) => (
                    <Theme 
                    isBg={true}
                    backgoundMode ={true} 
                    bgColor = {bg.backgroundColor}
                    key={i} />
                ))}
            </div>
        </div>
    );
}

export default Background;