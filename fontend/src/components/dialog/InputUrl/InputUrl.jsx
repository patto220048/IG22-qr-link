import { useState } from "react";
import "./InnputUrl.scss"

function InputUrl({socialName}) {
    const toLowerCase = (text) =>{
        return text.toLowerCase();
    }
    const [urlIcon, setUrlIcon] = useState("")
    
    return (
        <div className="InputUrl">
            <h3 className="InputUrl-iconName">Add icon ⭐ {socialName} ⭐</h3>
            <input className="InputUrl-input" type="text" placeholder="Enter your URLs here*" onChange={(e)=>{setUrlIcon(e.target.value)}}/>
            <p className="InputUrl-desc">Example : https://www.{toLowerCase(socialName)}.com/*usename*</p>
        </div>
      );
}

export default InputUrl;