import "./BgGadient.scss"

function BgGadient({setopenGadient,setOpenColor}) {
    const handledOpen = () => {
        setopenGadient(true)
        setOpenColor(false)
    }
    return (  
        <section className="BgGadient" onClick={handledOpen}>
        <div className="BgGadient-item"></div>
        <span className="BgGadient-title">Gadient</span>
    </section>
    );
}

export default BgGadient;