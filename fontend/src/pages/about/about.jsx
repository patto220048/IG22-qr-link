import './About.scss';
// eslint-disable-next-line no-unused-vars
import imageCard from '../../assets/img/nfc-card.jpg';
function About() {
    return (
        <>
            <section className="section_all bg-light" id="about">
                <div className="container-about">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title_all text-center">
                                <h3 className="font-weight-bold title">
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
                                <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">
                                    Our Story
                                </h2>
                                <p className="text-muted mt-3">
                                    If you have difficulty finding and exchanging personal information with someone,
                                    this product will help you make it easier and more convenient with just one touch.
                                </p>

                                <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">
                                    Mission State
                                </h2>
                                <p className="text-muted mt-3">
                                    {' '}
                                    Our products are on a mission to connect people more easily and conveniently.
                                </p>
                                <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">
                                    What Set Us Apart
                                </h2>
                                <p className="text-muted mt-3">Do not lose your information.</p>
                                <br />
                                <p className="text-muted mt-3">You can check anytime on the web</p>
                                <br />
                                <p className="text-muted mt-3">Contents can be edited.</p>
                                <br />
                                <h3 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">
                                    Unique Design
                                </h3>
                                <p className="text-muted mt-3">There are many styles and colors to choose from</p>
                                <p className="text-muted mt-3">Freely set personal information, SNS link, etc...</p>
                                <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">
                                    Join Us on Our Journey
                                </h2>
                            </div>
                        </div>
                        <div className="col-lg-6 pl-10">
                            <div className="img_about mt-3">
                                <img src={imageCard} alt="card" className="img-fluid mx-auto d-block card" />
                            </div>
                        </div>
                    </div>
                    <br />

                    <h2 className="fw-bolder">Team Member</h2>

                    <div className="member-group">
                        <div className="col-lg-3">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    {/* <div className="about_icon">
                                        <i className="fas fa-paper-plane"></i>
                                    </div> */}

                                    <img
                                        className="img-avatar"
                                        src="https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/260661638_927868901201648_5970155211689145139_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ujMeeGc90MAAX__zrUW&_nc_ht=scontent-nrt1-1.xx&oh=00_AfDWbdpj9bqD4uJ7N6z4VCCuMvAScBlOau56yC_EBg8QOA&oe=65B74D87"
                                        alt="patto"
                                    />

                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">Project Manager</h5>
                                    <p className="edu_desc mb-0 mt-3 text-muted"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    {/* <div className="about_icon">
                                        <i className="fas fa-paper-plane"></i>
                                    </div> */}

                                    <img
                                        className="img-avatar"
                                        src="https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/307158447_1134362604097988_1118604667491892605_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=blrWTh6wpeUAX8TJ5z0&_nc_ht=scontent-nrt1-1.xx&oh=00_AfDooT0lYE0u3p2wmmMv2R4BW3TcTr-i9kfytl1yO53Ciw&oe=65B7179E"
                                        alt="xie-xie"
                                    />

                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">Designer</h5>
                                    <p className="edu_desc mb-0 mt-3 text-muted"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    {/* <div className="about_icon">
                                        <i className="fas fa-paper-plane"></i>
                                    </div> */}

                                    <img
                                        className="img-avatar"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5xhkK_WqPskjNfqOnimTxJm17IpQodAquw&usqp=CAU"
                                        alt="nhan"
                                    />

                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">Frontend Leader</h5>
                                    <p className="edu_desc mb-0 mt-3 text-muted"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    {/* <div className="about_icon">
                                        <i className="fas fa-paper-plane"></i>
                                    </div> */}

                                    <img
                                        className="img-avatar"
                                        src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.18169-9/23659278_1897028463947926_3804028324062442734_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=be3454&_nc_ohc=QpG5UB36j60AX9Ow7vu&_nc_oc=AQnMzgzWH6SWWB7fTeDSbCsVx485EEfoO_eGv4MkyUMVLVxctM7SaXETMg0pTluH5Hs&_nc_ht=scontent-nrt1-1.xx&oh=00_AfAlr7n5Ef789R3KJrmGcAds0Ewhwo2Fn8pBg54n0UZSIA&oe=65D91B6B"
                                        alt="Dng"
                                    />

                                    <h5 className="text-dark text-capitalize mt-3 font-weight-bold">Tester</h5>
                                    <p className="edu_desc mb-0 mt-3 text-muted"></p>
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
