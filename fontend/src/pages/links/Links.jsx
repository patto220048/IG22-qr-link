import { useEffect, useState } from 'react';
import LinksItems from '../../components/LinkItems/LinksItems';
import PreView from '../../components/Preview/PreView';
import { plusIcon } from '../../svg/icon';
import './Links.scss';
import AddLink from '../../components/AddLink/AddLink';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/dialog/loading/Loading';
import http from '../../instance/axiosInstance';
import { themeSuccess } from '../../redux-toolkit/themeSlice';

function Links({user}) {
    const loading = useSelector((state) => state.url.loading);
    const [isAddLink, setIsAddLink] = useState(false);
    const [values, setValues] = useState('');
    const currentUser = useSelector((state) => state.user.currentUser)
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleAddLink = () => {
        setIsAddLink(true);
    };
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     const fecthTheme = async() =>{
    //         try {
    //            const res = await http.get(`/card/v1/${currentUser?._id}`) 
    //            dispatch(themeSuccess(res.data))
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }
    //     fecthTheme()
    // },[currentUser?._id])
    return (
        <div className="Links">
                <div className="Links-contents">
                    {!isAddLink && (
                        <button className="Links-left-btn" onClick={handleAddLink}>
                            {loading ? (
                                <Loading urlLoading = {true} isLoading={loading} />
                            ) : (
                                <>{plusIcon(30, 30, "white")} Add link</>
                            )}
                        </button>
                    )}
                    {isAddLink && <AddLink isAddLink={isAddLink} setIsAddLink={setIsAddLink} onChange={onChange} values={values} setValues={setValues}/>}
                    <section className="Links-left-wapper">
                        <LinksItems user={user} onChange={onChange} />
                    </section>
                </div>
            
        </div>
    );
}

export default Links;
