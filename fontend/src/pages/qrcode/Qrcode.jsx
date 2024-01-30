import { useState } from 'react';
import './Qrcode.scss';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
function Qrcode() {
    const [value, setValue] = useState('');
    const [onQR, setOnQr] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div className="qrcode">
            <h1 className="qrcode-title">MAKE QR</h1>
            <div className="qrcode-wapper">
                <div className="qrcode-input">
                    <input
                        type="text"
                        className="input-value"
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your link ..."
                        required="true"
                    />
                    {/* <button className="btn-make-qr" onClick={handleMakeqr}>
                        Make QR
                    </button> */}
                </div>
                <h3>Your QrCode</h3>
                {/* <div className='qr-card'>

                </div> */}
                <QRCode className="qr" size={180} value={value} viewBox={`0 0 256 256`} />
            </div>
        </div>
    );
}

export default Qrcode;
