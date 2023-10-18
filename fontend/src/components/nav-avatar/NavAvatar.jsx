import './NavAvatar.scss';
function NavAvatar({usernameTitle, userImg, username}) {
    return (
        <section className="navAvatar">
            <img src={userImg ? userImg : "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"} alt="" className="navAvt-img" />
            <div className='navAvt-name'>
                <h3 className="name">@{usernameTitle} </h3>
                <p className="tagname">super-card/{username}</p>
            </div>
        </section>
    );
}

export default NavAvatar;
