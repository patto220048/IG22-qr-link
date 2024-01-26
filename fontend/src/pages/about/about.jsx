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
                    <p className="text-muted mt-3">You can check anytime on the web</p>
                    <p className="text-muted mt-3">Contents can be edited.</p>
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
                        // job2={"Backend Leader"}
                        link={'https://www.facebook.com/Hoonvn/'}
                        name={'HUU PHAT'}
                        img={
                            'https://firebasestorage.googleapis.com/v0/b/qr-link-34a7e.appspot.com/o/avatar%2Fmyimg.jpg?alt=media&token=4f5c8b26-7a00-4298-90fa-1f017e9fd4ca'
                        }
                        job={'Backend Leader'}
                    />
                    <Member
                        link={'#'}
                        name={'XIE XIE'}
                        img={
                            'https://firebasestorage.googleapis.com/v0/b/qr-link-34a7e.appspot.com/o/avatar%2F422651842_1572735166795275_2020067857013685496_n.jpg?alt=media&token=8c04ebf2-1384-4910-abe5-97dc96bd22b2'
                        }
                        job={'Designer'}
                    />
                    <Member
                        link={'#'}
                        name={'THIEN NHAN'}
                        img={
                            'https://firebasestorage.googleapis.com/v0/b/qr-link-34a7e.appspot.com/o/avatar%2Fnhan.jpg?alt=media&token=8de1f8f2-7044-4c09-af8a-e312d81f2809'
                        }
                        job={'Frontend Leader'}
                    />
                    <Member
                        link={'#'}
                        name={'TRUNG DUNG'}
                        img={
                            'https://firebasestorage.googleapis.com/v0/b/qr-link-34a7e.appspot.com/o/avatar%2F420182385_938503747937687_1170841713981671870_n.jpg?alt=media&token=7f144d8e-2df6-4644-a474-945495ad4574'
                        }
                        job={'Tester'}
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
