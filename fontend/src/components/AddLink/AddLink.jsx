import { useState } from 'react';
import { closeIcon } from '../../svg/icon';
import './AddLink.scss';
import http from "../../instance/axiosInstance"
import { useSelector } from 'react-redux';
function AddLink({ setIsAddLink,isAddLink }) {
    const currentTheme = useSelector((state)=> state.theme.currentTheme)

    const [values, setValues] = useState("")

    const handleAddLink = () => {
        const addLink = async()=> {
            try {
                const res = await http.post(`/link/${currentTheme._id}`,{
                    url: values.url,
                })
                console.log(res.data)
                setValues("")
               
            } catch (error) {
                console.log(error.message)
            }
        }
        addLink()
    }
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div className={"AddLink "}>
            <div className="AddLink-wapper">
                <div className="AddLink-content">
                    <h2 className="AddLink-content_title">Enter your URL</h2>
                    <div className="AddLink-content_group">
                        <input id="url" name='url' type="text" className="AddLink-content_input" placeholder='Your URL'  onChange={onChange}/>
                        <button className='AddLink-content-btn' onClick={handleAddLink}>ADD</button>
                    </div>

                    <section className="AddLink-content_option"></section>
                </div>

                <div className="AddLink-off" onClick={() => setIsAddLink(false)}>
                    {closeIcon(25, 25)}
                </div>
            </div>
        </div>
    );
}

export default AddLink;
