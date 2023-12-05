import { useEffect, useState } from "react";
import LinksItem from "../LinksItem/LinksItem";
import "./LinksItems.scss"
import { useSelector } from "react-redux";
import http from "../../instance/axiosInstance";
function LinksItems() {
    const currentTheme = useSelector((state)=> state.theme.currentTheme)

    const [links, setLinks] = useState()
    useEffect(()=>{
        const getLink = async()=> {
            try {
                const res = await http.get(`/link/${currentTheme._id}`)
                setLinks(res.data)
               
            } catch (error) {
                console.log(error.message)
            }
        }
        getLink()
    },[currentTheme._id])
    return (
        <div className="LinksItems"> 
            {links.map((link,index)=>(
                <LinksItem linkUrl ={link.url} linkTitle= {link.title} linkThumbnail={link.linkThumbnail} key={link._id}/>

            ))}
            
        </div>
      );
}

export default LinksItems;