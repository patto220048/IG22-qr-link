import './TempTheme.scss';
import themes from '../../themes/themes';
import Theme from '../Theme/Theme';
function TempTheme() {
    console.log(themes);

    return (    
        <div className="tempTheme">

            <div className="tempTheme-items">
                <Theme isTheme= {false}/>
                {themes.map((theme, i) => (
                    <Theme 
                    isTheme={true}
                    themeBg={theme.bg_img}  
                    themeOpacity={theme.bg_opacity} 
                    themeBoderRadius={theme.bnt_radius}
                    key={i} />
                ))}
            </div>
        </div>
    );
}

export default TempTheme;
