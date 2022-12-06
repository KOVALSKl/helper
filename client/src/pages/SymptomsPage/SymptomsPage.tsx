import './SymptomsPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks';
import SearchSymptomsList from '../../components/SearchSymptomsList/SearchSymptomsList';
import Back from '../../components/Buttons/Back/Back';
import MoveOn from '../../components/Buttons/MoveOn/MoveOn';

function SymptomsPage() {

    const navigate = useNavigate();

    const selectedSymptoms = useAppSelector(state => state.selectedSymtpoms.value);

    return (
        <div className='symptoms-page page'>
            <span className='tip'>Выбери подходящие симптомы <br /> (просто кликни на нужные)</span>
            <SearchSymptomsList />
            <div className='movement-links'>
                <Back to='/' />
                <MoveOn
                    classNames={[
                        (selectedSymptoms.length < 3)
                            ? 'disabled'
                            : 'active'
                    ]}
                    to='/diagnoses'
                    disabled={(selectedSymptoms.length < 3)}
                />
            </div>
        </div>
    );
}

export default SymptomsPage;