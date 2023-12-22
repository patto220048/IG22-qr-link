import './ButtonLink.scss';

function ButtonLink() {
    return (
        <div className="buttonLink">
            <div className="buttonLink-items">
                <section className="buttonLink-fill">
                    <h1 className="buttonLink-title">Fill</h1>
                    <ul className="buttonLink-fill-items">
                        <button className="buttonLink-item square"></button>
                        <button className="buttonLink-item half-square"></button>
                        <button className="buttonLink-item round"></button>
                    </ul>
                </section>
                <section className="buttonLink-outline">
                    <h1 className="buttonLink-title">Outline</h1>

                    <ul className="buttonLink-outline-items">
                        <button className="buttonLink-item square"></button>
                        <button className="buttonLink-item half-square"></button>
                        <button className="buttonLink-item round"></button>
                    </ul>
                </section>
                <section className="buttonLink-shadow">
                    <h1 className="buttonLink-title">Shadow</h1>

                    <ul className="buttonLink-shadow-items">
                        <button className="buttonLink-item square"></button>
                        <button className="buttonLink-item half-square"></button>
                        <button className="buttonLink-item round"></button>
                    </ul>
                </section>

                <section className="buttonLink-hard-shadow">
                    <h1 className="buttonLink-title">Hard Shadow</h1>

                    <ul className="buttonLink-hard-shadow-items">
                        <button className="buttonLink-item square"></button>
                        <button className="buttonLink-item half-square"></button>
                        <button className="buttonLink-item round"></button>
                    </ul>
                </section>
            </div>
            <div className="buttonLinks-color">
                <h1 className="buttonLink-title">Color</h1>
                <div className='buttonLinks-colorBox'></div>
            </div>

            <div className="buttonLinks-fontcolor">
                <h1 className="buttonLink-title">Font Color</h1>
                <div className='buttonLinks-colorBox'></div>

            </div>
        </div>
    );
}

export default ButtonLink;
