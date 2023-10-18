import './TempProfile.scss';
import { addIcon } from '../../svg/icon';
import Dialog_UI from '../dialog/Dialog_IU';
import { useEffect, useState } from 'react';
import axiosInstance from '../../instance/axiosInstance';
import { useSelector } from 'react-redux';
function TempProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [openDialog, setOpenDialog] = useState(false);
    const [values, setValues] = useState(null);
    console.log(values);
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const updateUser = async () => {
            try {
                const res = await axiosInstance.put(`users/${currentUser._id}`, {
                    usernameTitle: values.username,
                    decs: values.decs,
                },
                {
                    headers : {authorization: "Bearer " + currentUser.accsessToken} 
                }
                );
                
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        updateUser();
    }
 
    return (
        <div className="tempProfile">
            <div className="tempProfile-item">
                <img
                    className="tempProfile_img"
                    src="https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <div className="tempProfile-btn">
                    <button className="tempProfile-btn_item pickup" onClick={() => setOpenDialog(true)}>
                        Pick Image
                    </button>
                    <button className="tempProfile-btn_item remove">Remove</button>
                </div>
                <div>
                    <Dialog_UI openDialog={openDialog} setOpenDialog={setOpenDialog} />
                </div>
            </div>
            <div className="tempProfile-input">
                <h4 className="tempProfile-input_title">Profile name</h4>
                <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder={`@`+ currentUser.usernameTitle}
                    className="tempProfile-input"
                    onChange={onChange}
                />
                <input />
                <textarea
                    name="decs"
                    id="decs"
                    cols="30"
                    rows="10"
                    className="tempProfile-textarea"
                    maxLength={80}
                    placeholder="Your description here ..."
                    onChange={onChange}
                ></textarea>
            </div>
            <div className="tempProfileAddIcon">
                {/* <button className="tempProfileAddIcon-btn btn-save">Save </button> */}
                <button className="tempProfileAddIcon-btn">{addIcon(20, 20)}Add Social icons</button>
                <button className="tempProfileAddIcon-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default TempProfile;
