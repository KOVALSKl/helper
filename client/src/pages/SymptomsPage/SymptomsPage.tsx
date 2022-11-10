import './SymptomsPage.scss'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';
import { ApiError, Symptom } from '../../types/types'

import SearchSelect from '../../components/SearchSelect/SearchSelect';
import List from '../../components/List/List';
import { useGetSymptomsQuery } from '../../redux/api/symptomsApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { PulseLoader } from 'react-spinners';
import { useAppSelector } from '../../redux/hooks';

function SymptomsPage() {

    const { data, isLoading, error } = useGetSymptomsQuery();

    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [listVisible, setListVisible] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (data) {
            setSymptoms(data.map((item) => new Symptom(item.id, item.name)))
        }
    }, [data])

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
            {
                (!listVisible)
                    ? null
                    : <List list={sortedSymptoms} />
            }
            <div className='movement-links'>
                <Link className='back-lnk' to='/'>
                    <img
                        src={require('../../assets/left-arrow.svg').default}
                        alt='go to home page button'
                    />
                    <span>назад</span>
                </Link>
                <Link className='move-on-lnk' to='/diagnoses'>
                    вперед
                </Link>
            </div>
        </div>
    );
}

export default SymptomsPage;