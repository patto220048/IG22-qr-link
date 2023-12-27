import { useEffect, useState } from "react";
import LinksItem from "../LinksItem/LinksItem";
import "./LinksItems.scss"
import { useDispatch, useSelector } from "react-redux";

function LinksItems({onChange}) {
    // const currentTheme = useSelector((state)=> state.theme.currentTheme)
    const currentLink = useSelector((state)=> state.url.currentUrl)

    return (
        <div className="LinksItems"> 
            {currentLink?.map((link,index)=>(
                <LinksItem onChange={onChange} link={link} linkIndex = {index} linkId ={link?._id} linkUrl ={link.url} linkTitle= {link.urlTitle} linkThumbnail={link.linkThumbnail} acticve={link.acticve} key={index}/>
            ))}
            
        </div>
      );
}

export default LinksItems;