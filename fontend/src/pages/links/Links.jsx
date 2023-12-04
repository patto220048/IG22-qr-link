import PreView from "../../components/Preview/PreView";
import "./Links.scss"


function Links() {
    return ( 
       <div className="Links">
        <div className="Links-left">
            <section className="Links-left-wapper">
                <button className="Links-left-btn" >Add Link</button>
            </section>
        </div>
        <div className="Links-right">
                <PreView/>
            </div>
       </div>
     );
}

export default Links;