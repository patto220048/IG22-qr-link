import "./UploadImg.scss"
import app from "../../firebase/config"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useEffect, useState,memo } from "react";
import Loading from "../dialog/loading/Loading";

function UploadImg({avatarFile,setResultImg,resultImg}) {
    const [imgPercent, setImgPercent] = useState(0)
    console.log(imgPercent+ "%")
    const upload = (file,type) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                type === 'avatar' && setImgPercent(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log('Upload error: ' + error.message);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setResultImg(pre=> {
                        return {...pre, [type]: downloadURL}
                    })
                });
            },
        );
    };
    useEffect(()=>{
        avatarFile && upload(avatarFile,"avatar")
    },[avatarFile])
    return (  
        <section className="updaloadImg">
            {resultImg ? <img className="updaloadImg-preview"  src={resultImg?.avatar}></img> : imgPercent+"%"}
        </section>
    );
}

export default memo(UploadImg);