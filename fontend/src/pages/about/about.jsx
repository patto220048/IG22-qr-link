import './About.scss';

function About() {
    return(
        <div className='about'>
            <div className="about-container">
                <div className='about-story'>
                    <h2>Our Story</h2>
                    {/* Image */}
                    <p>
                    If you have difficulty finding and exchanging personal information with someone,
                    this product will help you make it easier and more convenient with just one touch.
                    </p>
                </div>
                
                <div className="about-mission">
                    {/* image */}
                    <p>
                        Our product are on a mission to connect people more easily and conveniently.
                    </p>
                </div>

                <div className="about-team">
                    {/* image & explain */}
                </div>

                <div className="about-explain">
                    <h2>
                        What Sets Us Apart?
                    </h2>

                    <div className='about-explain-lose'>
                        <h4>
                            Do not lose your information
                        </h4>
                        <p>You can check anytime on the web</p>
                    </div>

                    <div className='about-explain-contents'>
                        <h4>
                            Contents can be edited
                        </h4>
                        <p>Change contact information etc. in real-time</p>
                    </div>

                    <div className='about-explain-unique'>
                        <h4>unique design</h4>
                        <p>There are many styles and colors to choose from</p>
                        <p>Freely set personal information, SNS link, etc.</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default About;