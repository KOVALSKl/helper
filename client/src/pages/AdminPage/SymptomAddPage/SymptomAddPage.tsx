import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SymptomPreview } from '../../../types/types';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { sendRequest } from '../../../api/api';

import 'react-toastify/dist/ReactToastify.css';
import './SymptomAddPage.scss'
import { useGetSymptomsGroupsQuery } from '../../../redux/api/symptomsApi';
import { SyncLoader } from 'react-spinners';

function SymptomAddPage() {

    const [symptomName, setSymptomName] = useState<string>('');
    const [group, setGroup] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false);

    const { data, isLoading, error } = useGetSymptomsGroupsQuery();

    function submit() {
        if (symptomName !== '' && group !== '') {
            setDisabled(true);
            sendRequest<SymptomPreview>({
                url: `${process.env.REACT_APP_HOST_LINK}/symptoms`,
                sendingData: {
                    name: symptomName,
                    symptomsGroupId: Number(group),
                }
            }).then((value: AxiosResponse) => {
                toast.success('Симптом успешно добавлен', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setSymptomName('');
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
            toast.error(`Заполни все поля`, {
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
        <div className='symptom-add-page'>
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
            <h2 className='page-title'>Добавить симптом</h2>

            <form className='symptom-form' onSubmit={(e) => {
                e.preventDefault();
            }}>
                <input
                    className='symptom-name'
                    value={symptomName}
                    placeholder='Название симптома'
                    onChange={(e) => setSymptomName(e.target.value)}
                />
                <h3>Группа симптомов</h3>
                {(!data)
                    ? <SyncLoader />
                    : <ul className='group-list'>
                        {data.map((item) => {
                            return (
                                <li className='group-item' key={item.id}>
                                    <input
                                        name='group'
                                        type='radio'
                                        value={item.id}
                                        id={`group-item__checkbox-${item.id}`}
                                        onChange={(e) => setGroup(e.target.value)} />
                                    <label
                                        htmlFor={`group-item__checkbox-${item.id}`}>
                                        {item.name}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                }

                <button
                    className='send'
                    disabled={disabled}
                    onClick={() => submit()}>
                    отправить
                </button>
            </form>
            <Link to={'/admin'}>go to admin</Link>
        </div>

    );
}

export default SymptomAddPage;