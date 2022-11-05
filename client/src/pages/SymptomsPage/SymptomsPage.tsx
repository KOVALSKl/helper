import './SymptomsPage.scss'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';
import { ApiError, Symptom } from '../../types/types'

import axios from 'axios';
import SearchSelect from '../../components/SearchSelect/SearchSelect';
import List from '../../components/List/List';

function SymptomsPage() {

    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [listVisible, setListVisible] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST_LINK}/symptoms`)
            .then(({ data }: { data: Symptom[] }) => setSymptoms(data.map(item => new Symptom(item.id, item.name))))
            .catch(({ response }: { response: ApiError }) => console.log(response))
    }, [])

    const sortedSymptoms = useMemo(() => {
        return (searchValue !== '')
            ? symptoms.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            : symptoms
    }, [searchValue, symptoms])

    return (
        <div className='symptoms-page page'>
            <span className='tip'>Выбери подходящие симптомы <br /> (просто кликни на нужные)</span>
            <SearchSelect
                symptomsLength={symptoms.length}
                listVisible={listVisible}
                changeListVisible={setListVisible}
                setSearchValue={setSearchValue} />
            {(!listVisible)
                ? null
                : <List list={sortedSymptoms} />
            }
            <div className='movement-links'>
                <Link className='move-on-lnk' to='/result'>
                    вперед
                </Link>
                <Link className='back-lnk' to='/'>
                    <img
                        src={require('../../assets/left-arrow.svg').default}
                        alt='go to home page button'
                    />
                    <span>назад</span>
                </Link>
            </div>
        </div>
    );
}

export default SymptomsPage;