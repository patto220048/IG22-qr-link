import { useEffect, useState } from "react";
import LinksItem from "../LinksItem/LinksItem";
import "./LinksItems.scss"
import { useDispatch, useSelector } from "react-redux";
import http from "../../instance/axiosInstance";
import { urlFail, urlStart, urlSuccess } from "../../redux-toolkit/UrlSlice";
function LinksItems({onChange}) {
    const currentTheme = useSelector((state)=> state.theme.currentTheme)
    const currentLink = useSelector((state)=> state.url.currentUrl)
    const dispatch = useDispatch()
    const [links, setLinks] = useState([])
    useEffect(()=>{
        dispatch(urlStart())
        const getLink = async()=> {
            try {
                const res = await http.get(`/link/${currentTheme?._id}`)
                setLinks(res.data)
                dispatch(urlSuccess(res.data))
            } catch (error) {
                dispatch(urlFail())
                console.log(error.message)
            }
        }
        getLink()
    },[currentTheme._id])
    return (
        <div className="LinksItems"> 
            {currentLink?.map((link,index)=>(
                <LinksItem onChange={onChange} linkId ={link?._id} linkUrl ={link.url} linkTitle= {link.urlTitle} linkThumbnail={link.linkThumbnail} key={index}/>
            ))}
            
        </div>
      );
}

export default LinksItems;