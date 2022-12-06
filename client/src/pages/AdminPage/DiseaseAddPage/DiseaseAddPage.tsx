import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import List from '../../../components/List/List';
import { useGetSymptomsQuery } from '../../../redux/api/symptomsApi';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { DiseasePreview, DiseaseTip, DiseaseTipType, Symptom } from '../../../types/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DiseaseAddPage.scss'
import { Link } from 'react-router-dom';
import TipsList from '../../../components/TipsList/TipsList';

import { emptySymptoms } from '../../../redux/slices/selectedSymtpomsSlice';
import { sendRequest } from '../../../api/api';
import SymptomsList from '../../../components/SymptomsList/SymptomsList';
import SearchSymptomsList from '../../../components/SearchSymptomsList/SearchSymptomsList';

function DiseaseAddPage() {

    const { data, isLoading, error } = useGetSymptomsQuery();

    const selectedSymptoms = useAppSelector(state => state.selectedSymtpoms.value);
    const dispatch = useAppDispatch();

    const [symptoms, setSymptoms] = useState<Symptom[]>([]);

    const [diseaseName, setDiseaseName] = useState<string>('');
    const [diseaseDescription, setDiseaseDescription] = useState<string>('');
    const [tips, setTips] = useState<DiseaseTip[]>([]);

    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (data) setSymptoms(data.map((item) => new Symptom(item)))
    }, [data])

    function sendDisease() {
        if (diseaseName != ''
            && diseaseDescription != ''
            && tips.length > 0
            && selectedSymptoms.length > 0) {
            setDisabled(true);
            sendRequest<DiseasePreview>({
                url: `${process.env.REACT_APP_HOST_LINK}/diseases`,
                sendingData: {
                    diseaseInfo: {
                        name: diseaseName,
                        description: diseaseDescription,
                    },
                    tips: tips.map((item) => item.value).join('|'),
                    symptoms: JSON.stringify(selectedSymptoms)
                }
            }).then((res: AxiosResponse) => {
                toast.success('Болезнь успешно добавлена', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setDiseaseName('');
                setDiseaseDescription('');
                setTips([]);
                dispatch(emptySymptoms());
            })
                .catch((err: AxiosError) => {
                    toast.error(`${err.response?.statusText}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .finally(() => {
                    setDisabled(false);
                })
        } else {
            toast.error('Заполните все поля', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        (!data && isLoading)
            ? <SyncLoader color='#14a433' />
            :
            <div className='disease-add-page'>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <h2 className='page-title'>Добавить болезнь</h2>

                <form className='disease-form' onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <input
                        className='disease-name'
                        value={diseaseName}
                        placeholder='Название болезни'
                        onChange={(e) => setDiseaseName(e.target.value)}
                    />

                    <textarea
                        className='disease-description'
                        value={diseaseDescription}
                        placeholder='Описание болезни'
                        onChange={(e) => setDiseaseDescription(e.target.value)}
                    ></textarea>

                    <div className="disease-symptoms">
                        <h3>Симптомы болезни</h3>
                        <SearchSymptomsList classNames={['admin-search-list']} />
                    </div>

                    <div className='tips'>
                        <h3>Советы</h3>
                        <TipsList
                            list={tips}
                            tipType={DiseaseTipType.TOEDIT}
                            updateList={setTips}
                            classNames={['admin-tips-list']}
                        />
                        <div className='action-buttons'>
                            <button onClick={() => {
                                setTips([...tips, new DiseaseTip()]);
                            }}>
                                добавить
                            </button>
                            <button
                                id='delete'
                                disabled={!(tips.length > 0)}
                                onClick={() => {
                                    setTips(tips.slice(0, tips.length - 1));
                                }}
                            >
                                удалить
                            </button>
                        </div>
                    </div>

                    <button
                        className='send'
                        disabled={disabled}
                        onClick={() => sendDisease()}>
                        отправить
                    </button>
                </form>
                <Link to={'/admin'}>go to admin</Link>
            </div>

    );
}

export default DiseaseAddPage;