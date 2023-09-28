import "./Avatar.scss"
function Avatar(props) {
    return (
    <div className="avatar">
        <img className="avatar-img" src="https://images.unsplash.com/photo-1682685797088-283404e24b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
        <h3 className="avatar-name"> @DINH HUU PHAT</h3>
        <p className="avatar-desc">Des2312312c</p>
    </div> 
    );
}

export default Avatar;