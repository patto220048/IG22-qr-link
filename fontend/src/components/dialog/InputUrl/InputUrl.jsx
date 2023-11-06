import "./InnputUrl.scss"

function InputUrl({socialName}) {
    const toLowerCase = (text) =>{
        return text.toLowerCase();
    }

    return (
        <div className="InputUrl">
            <h3 className="InputUrl-iconName">Add icon ⭐ {socialName} ⭐</h3>
            <input className="InputUrl-input" type="text" placeholder="Enter your URLs here*" />
            <p className="InputUrl-desc">Example : https://www.{toLowerCase(socialName)}.com/*usename*</p>
        </div>
      );
}

export default InputUrl;