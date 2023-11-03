import { Link } from 'react-router-dom';
import './Home.scss';
import { useState } from 'react';
//pages
import Intro from './Intro/Intro'
import Info from './info/Info';
import Share from './share/Share';
import Questions from './questions/Questions';
import Card from './card/Card';
import Footer from '../../layouts/footer/Footer';

function Home() {
    const [homeInput, setHomeInput] = useState('');
    return (
        <div className="home">
            <div className="home-container">
                <Intro/>
                <Info/>
                <Card/>
                <Share/>
                <Questions/>
                <Footer/>
            </div>
        </div>
    );
}

export default Home;
