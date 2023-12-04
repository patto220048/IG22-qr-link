import LinksItems from "../../components/LinkItems/LinksItems";
import PreView from "../../components/Preview/PreView";
import { plusIcon } from "../../svg/icon";
import "./Links.scss"


function Links() {


    return ( 
       <div className="Links">
        <div className="Links-left">
            <button className="Links-left-btn" >{plusIcon(30,30)} Add Link</button>
            <section className="Links-left-wapper">
               <LinksItems/>
            </section>

        </div>
        <div className="Links-right">
                <PreView/>
            </div>
       </div>
     );
}

export default Links;