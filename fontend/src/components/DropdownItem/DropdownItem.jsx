
import { Link } from "react-router-dom";
import "./DropdownItem.scss"

function DropdownItem(props) {
    return (
        <>
        <Link to={props.link} style={{color:"black"}}>
        <li className="dropdown-item" >
            <span className="dropdown-icon">{props.icon}</span>
            <p>{props.text}</p>
        </li>
        </Link>
        </>
        
    );
}

export default DropdownItem;
