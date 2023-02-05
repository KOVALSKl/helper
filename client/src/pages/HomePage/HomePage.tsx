import { Link } from "react-router-dom";
import './HomePage.scss'

function HomePage() {
    return (
        <div className="home-page">
            <div className='start-section'>
                <div className='start-section__logo'>
                    Это &#8203;
                    <span className='logo'>
                        helper
                        <img
                            src={require('../../assets/bandage.svg').default}
                            alt='helper'
                            className='letter-image' />
                        <img
                            src={require('../../assets/bandage.svg').default}
                            alt='helper'
                            className='letter-image' />
                    </span>
                </div>
                <Link to='/symptoms' className='start-button'>
                    <img src={require('../../assets/stethoscope.svg').default} />
                </Link>
                <div className='start-section__tips'>
                    Я помогу тебе установить диагноз
                    и найти докторов поблизости,
                    просто кликни <span className='active-text'>кнопку</span><br /> чтобы начать
                    <img
                        src={require('../../assets/arrow_to_start_btn.svg').default}
                        id='arrow-to-btn'
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;