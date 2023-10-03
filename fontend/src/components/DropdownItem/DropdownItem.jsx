
import "./DropdownItem.scss"

function DropdownItem(props) {
    return (
        <li className="dropdown-item">
            <span className="dropdown-icon">{props.icon}</span>
            <p>{props.text}</p>
        </li>
    );
}

export default DropdownItem;
