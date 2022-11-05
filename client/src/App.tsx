import './App.scss';
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className='start-section'>
        <div className='start-section__logo'>
          {/* This is &#8203; */}
          Это &#8203;
          <span className='logo'>
            helper
            <img
              src={require('./assets/bandage.svg').default}
              alt='helper'
              className='letter-image' />
            <img
              src={require('./assets/bandage.svg').default}
              alt='helper'
              className='letter-image' />
          </span>
          {/* <span className='green-circle'></span>
          <span className='green-circle'></span> */}
        </div>
        <Link to='/symptoms' className='start-button'>
          <img src={require('./assets/stethoscope.svg').default} />
        </Link>
        <div className='start-section__tips'>
          Я помогу тебе установить диагноз
          и найти докторов поблизости,
          просто кликни <span className='active-text'>кнопку</span><br /> чтобы начать

          {/* I will help you to establish your
          diagnosis and find doctors nearby
          just click <span className='active-text'>the button</span><br />to get started */}
          <img
            src={require('./assets/arrow_to_start_btn.svg').default}
            id='arrow-to-btn'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
