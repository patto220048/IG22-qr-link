import './TempProfile.scss';
import { addIcon } from '../../svg/icon';
import Dialog_UI from '../dialog/Dialog_IU';
import { useState } from 'react';
function TempProfile() {
    const [openDialog, setOpenDialog] = useState(false)
    return (
        <div className="tempProfile">
            <div className="tempProfile-item">
                <img
                    className="tempProfile_img"
                    src="https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <div className="tempProfile-btn">
                    <button className="tempProfile-btn_item pickup" onClick={()=>setOpenDialog(true)}>Pick Image</button>
                    <button className="tempProfile-btn_item remove">Remove</button>
                </div>
                <div>
                    <Dialog_UI openDialog={openDialog} setOpenDialog={setOpenDialog}   />
                </div>
            </div>
            <div className="tempProfile-input">
                <h4 className="tempProfile-input_title">Profile name</h4>
                <input type="text" placeholder="@dinhhuuphat" className="tempProfile-input" />
                <input />
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="tempProfile-textarea"
                    maxLength={80}
                    placeholder="Your description here ..."
                ></textarea>
            </div>
            <div className="tempProfileAddIcon">
                {/* <button className="tempProfileAddIcon-btn btn-save">Save </button> */}
                <button className="tempProfileAddIcon-btn">{addIcon(20, 20)}Add Social icons</button>
            </div>
           
        </div>
    );
}

export default TempProfile;
