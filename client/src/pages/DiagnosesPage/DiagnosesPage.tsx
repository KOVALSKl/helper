import './DiagnosesPage.scss'
import { SyncLoader } from 'react-spinners';
import { useGetDiagnoseQuery } from '../../hooks/useGetDiagnoseQuery';
import { useEffect, useState } from 'react';
import List from '../../components/List/List';
import { Disease } from '../../types/types';

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
                    <span>Diagnose</span>
                </div>
                : <div className='main'>
                    <h2 className='page-title'>Probable Diagnosis</h2>
                    <List list={diseasesList} />
                </div>}
        </div>
    );
}

export default DiagnosisPage;