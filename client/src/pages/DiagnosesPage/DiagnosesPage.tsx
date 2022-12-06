import './DiagnosesPage.scss'
import { SyncLoader } from 'react-spinners';
import { useGetDiagnoseQuery } from '../../hooks/useGetDiagnoseQuery';
import { useEffect, useState } from 'react';
import List from '../../components/List/List';
import { Disease } from '../../types/types';
import { Link } from 'react-router-dom';

function DiagnosisPage() {

    const { data, isLoading, error } = useGetDiagnoseQuery();

    const [diseasesList, setDiseasesList] = useState<Disease[]>([]);

    useEffect(() => {
        if (data)
            setDiseasesList(data.map(item => new Disease(item)))
    }, [data])

    return (
        <div className='probable-diagnoses-page'>
            {(isLoading || diseasesList.length === 0)
                ? <div className='loader-screen'>
                    <SyncLoader color='#14a433' />
                    <span>диагностируем</span>
                </div>
                : <div className='main'>
                    <h2 className='page-title'>Вероятные диагнозы</h2>
                    <List list={diseasesList} />
                    <Link className='back-lnk' to='/symptoms'>
                        <img
                            src={require('../../assets/left-arrow.svg').default}
                            alt='go to home page button'
                        />
                        <span>назад</span>
                    </Link>
                </div>}
        </div>
    );
}

export default DiagnosisPage;