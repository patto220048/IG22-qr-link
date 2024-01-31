import './Member.scss';

function Member(props) {
    return (
        <a href={props.link} className="Member" target="blank" title={props.name}>
            <img className="Member-avt" src={props.img} alt={props.img} />
            <h5 className="Member-name">{props.name}</h5>
            <p className="Member-desc">{props.job}</p>
            <p className="Member-desc">{props.job2}</p>
        </a>
    );
}

export default Member;
