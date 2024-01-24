import './About.scss';
// eslint-disable-next-line no-unused-vars
import imageCard from '../../assets/img/nfc-card.jpg';
function About() {
    return (
        <>
            <section className="section_all bg-light" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title_all text-center">
                                <h3 className="font-weight-bold">
                                    Welcome To <span className="text-custom">My Product</span>
                                </h3>
                                <p className="section_subtitle mx-auto text-muted">
                                     <br />
                                    {/* Lorem Ipsum has been the industry's standard dummy text. */}
                                </p>
                                <div className="">
                                    <i className=""></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row vertical_content_manage mt-5">
                        <div className="col-lg-6">
                            <div className="about_header_main mt-3">
                                <div className="about_icon_box">
                                    <p className="text_custom font-weight-bold"></p>
                                </div>
                                <h4 className="about_heading text-capitalize font-weight-bold mt-4">
                                    Our Story
                                </h4>
                                <p className="text-muted mt-3">
                                If you have difficulty finding and exchanging personal information with someone, 
                                this product will help you make it easier and more convenient with just one touch.
                                </p>

                                <h4 className='about_heading text-capitalize font-weight-bold mt-4'>
                                  Mission State
                                </h4>
                                <p className="text-muted mt-3">
                                    {' '}
                                    Our products are on a mission to connect people more easily and conveniently.
                                </p>
                                <h4 className='about_heading text-capitalize font-weight-bold mt-4'>
                                  What Set Us Apart
                                </h4>
                                <p className='text-muted mt-3'>
                                  Do not lose your information.
                                </p><br />
                                <p className='text-muted mt-3'>
                                  You can check anytime on the web
                                </p><br />
                                <p className='text-muted mt-3'>
                                  Contents can be edited.
                                </p><br />
                                <h6 className='about_heading text-capitalize font-weight-bold mt-4'>
                                  Unique Design
                                </h6>
                                <p className='text-muted mt-3'>
                                  There are many styles and colors to choose from
                                </p>
                                <p className='text-muted mt-3'>
                                  Freely set personal information, SNS link, etc...
                                </p>
                                <h4 className='about_heading text-capitalize font-weight-bold mt-4'>
                                  Join Us on Our Journey
                                </h4>
                            </div>
                            
                        </div>
                        <div className="col-lg-6">
                            <div className="img_about mt-3">
                                <img src={imageCard} alt="" className="img-fluid mx-auto d-block" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    <div className="about_icon">
                                        <i className="fas fa-pencil-alt"></i>
                                    </div>
                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">Creative Design</h5>
                                    <p className="edu_desc mt-3 mb-0 text-muted">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    <div className="about_icon">
                                        <i className="fab fa-angellist"></i>
                                    </div>
                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">
                                        We make Best Result
                                    </h5>
                                    <p className="edu_desc mb-0 mt-3 text-muted">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    <div className="about_icon">
                                        <i className="fas fa-paper-plane"></i>
                                    </div>
                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">best platform </h5>
                                    <p className="edu_desc mb-0 mt-3 text-muted">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
