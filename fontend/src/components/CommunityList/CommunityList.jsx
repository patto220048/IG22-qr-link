import { useEffect, useState } from 'react';
import CommunityItem from '../CommunityItem/CommunityItem';
import './CommunityList.scss';
import http from '../../instance/axiosInstance';
import Footer from '../../layouts/footer/Footer';

function CommunityList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fectchUSer = async () => {
            try {
                const res = await http.get(`/users`);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fectchUSer();
    }, []);

    return (
        <>
    
        <div className="CommunityList">
            {users.map((user)=>(
                <CommunityItem key={user._id} user={user}/>
            ))}
        </div>
            <Footer/>
        </>
    );
}

export default CommunityList;
