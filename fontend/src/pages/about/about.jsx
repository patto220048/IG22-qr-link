import './About.scss';
import nfcCard from '../../assets/img/nfc-card.jpg';
import Member from './Memeber';
function About() {
    return (
        <div className="About">
            <h2 className="About-title">
                Welcome To <span className="text-custom">My Product</span>
            </h2>
            <div className="About-container">
                <div className="About-left">
                    <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">Our Story</h2>
                    <p className="text-muted mt-3">
                        If you have difficulty finding and exchanging personal information with someone, this product
                        will help you make it easier and more convenient with just one touch.
                    </p>

                    <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">Mission State</h2>
                    <p className="text-muted mt-3">
                        Our products are on a mission to connect people more easily and conveniently.
                    </p>
                    <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">What Set Us Apart</h2>
                    <p className="text-muted mt-3">Do not lose your information.</p>
                    <br />
                    <p className="text-muted mt-3">You can check anytime on the web</p>
                    <br />
                    <p className="text-muted mt-3">Contents can be edited.</p>
                    <br />
                    <h2 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">Unique Design</h2>
                    <p className="text-muted mt-3">There are many styles and colors to choose from</p>
                    <p className="text-muted mt-3">Freely set personal information, SNS link, etc...</p>
                    <a href="https://super-card.online/" className="join-me">
                        <h3 className="about_heading text-capitalize font-weight-bold mt-4 fw-bolder">
                            {'>>>>>'}Join Us on Our Journey{'<<<<<'}
                        </h3>
                    </a>
                </div>
                <div className="About-right">
                    <img className="About-right-img" src={nfcCard} alt="" loading="lazy" />
                </div>
            </div>
            <div className="About-member">
                <h2 className="About-title">Team Member</h2>
                <div className="About-group">
                    <Member
                        link={'https://www.facebook.com/Hoonvn/'}
                        name={'HUU PHAT'}
                        img={
                            'https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/260661638_927868901201648_5970155211689145139_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ujMeeGc90MAAX__zrUW&_nc_ht=scontent-nrt1-1.xx&oh=00_AfDWbdpj9bqD4uJ7N6z4VCCuMvAScBlOau56yC_EBg8QOA&oe=65B74D87'
                        }
                        job={'Project Manager'}
                    />
                    <Member
                        link={'#'}
                        name={'XIE XIE'}
                        img={
                            'https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/307158447_1134362604097988_1118604667491892605_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=blrWTh6wpeUAX8TJ5z0&_nc_ht=scontent-nrt1-1.xx&oh=00_AfDooT0lYE0u3p2wmmMv2R4BW3TcTr-i9kfytl1yO53Ciw&oe=65B7179E'
                        }
                        job={'Designer'}
                    />
                    <Member
                        link={'#'}
                        name={'THIEN NHAN'}
                        img={
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5xhkK_WqPskjNfqOnimTxJm17IpQodAquw&usqp=CAU'
                        }
                        job={'Frontend Leader'}
                    />
                    <Member
                        link={'#'}
                        name={'TRUNG DUNG'}
                        img={
                            'https://scontent-nrt1-1.xx.fbcdn.net/v/t1.18169-9/23659278_1897028463947926_3804028324062442734_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=be3454&_nc_ohc=QpG5UB36j60AX9Ow7vu&_nc_oc=AQnMzgzWH6SWWB7fTeDSbCsVx485EEfoO_eGv4MkyUMVLVxctM7SaXETMg0pTluH5Hs&_nc_ht=scontent-nrt1-1.xx&oh=00_AfAlr7n5Ef789R3KJrmGcAds0Ewhwo2Fn8pBg54n0UZSIA&oe=65D91B6B'
                        }
                        job={'Tester'}
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
