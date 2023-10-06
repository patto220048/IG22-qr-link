import './Loading.scss'
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
function Loading( {isLoading}) {
    return ( 
        <div className='loading'>
        <HashLoader	
        color={"red"}
        loading={isLoading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
     );
}

export default Loading;