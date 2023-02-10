import { Link } from "react-router-dom";
import { Fab, Box, SvgIcon } from "@mui/material";
import { ReactComponent as StethoScope } from '../../assets/stethoscope.svg';
import { Image } from "@mui/icons-material";

function HomePage() {
    return (
        // <div className="home-page">
        //     <div className='start-section'>
        //         <div className='start-section__logo'>
        //             Это &#8203;
        //             <span className='logo'>
        //                 helper
        //                 <img
        //                     src={require('../../assets/bandage.svg').default}
        //                     alt='helper'
        //                     className='letter-image' />
        //                 <img
        //                     src={require('../../assets/bandage.svg').default}
        //                     alt='helper'
        //                     className='letter-image' />
        //             </span>
        //         </div>
        //         <Link to='/symptoms' className='start-button'>
        //             <img src={require('../../assets/stethoscope.svg').default} />
        //         </Link>
        //         <div className='start-section__tips'>
        //             Я помогу тебе установить диагноз
        //             и найти докторов поблизости,
        //             просто кликни <span className='active-text'>кнопку</span><br /> чтобы начать
        //             <img
        //                 src={require('../../assets/arrow_to_start_btn.svg').default}
        //                 id='arrow-to-btn'
        //             />
        //         </div>
        //     </div>
        // </div>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '79px'
        }}>
            <Box>
                <Box sx={{
                    display: 'inline-block',
                    fontSize: '2rem'
                }}>
                    Это <span style={{ color: '#14a433', fontWeight: 'bold' }}>
                        helper
                    </span>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '47px'
            }}>
                <Link to='/symptoms'>
                    <Fab color="primary" sx={{ width: '70px', height: '70px' }}>
                        <SvgIcon component={StethoScope} fontSize='large' inheritViewBox />
                    </Fab>
                </Link>
                <Box sx={{
                    textAlign: 'center',
                    fontSize: '16px',
                    maxWidth: '196px',
                    position: 'relative'
                }}>
                    Я помогу тебе установить диагноз
                    и найти докторов поблизости,
                    просто кликни <span className='active-text'>кнопку</span><br /> чтобы начать
                    <img
                        src={require('../../assets/arrow_to_start_btn.svg').default}
                        style={{ position: 'absolute', bottom: '27px', right: '-15px' }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;