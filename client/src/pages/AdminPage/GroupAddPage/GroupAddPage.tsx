import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { sendRequest } from '../../../api/api';
import { GroupPreview } from '../../../types/types';
import './GroupAddPage.scss'

function GroupAddPage() {

    const [groupName, setGroupName] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false);

    function sendSymptom() {
        if (groupName != '') {
            setDisabled(true);
            sendRequest<GroupPreview>({
                url: `${process.env.REACT_APP_HOST_LINK}/groups`,
                sendingData: {
                    name: groupName,
                }
            })
                .then((res: AxiosResponse) => {
                    toast.success('Группа успешно добавлена', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setGroupName('');
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
            toast.error('Заполни все поля', {
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
        <div className='group-add-page'>
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
            <h2 className='page-title'>Добавить группу симптомов</h2>

            <form className='group-form' onSubmit={(e) => {
                e.preventDefault();
            }}>
                <input
                    className='group-name'
                    value={groupName}
                    placeholder='Название группы'
                    onChange={(e) => setGroupName(e.target.value)}
                />

                <button
                    className='send'
                    disabled={disabled}
                    onClick={() => sendSymptom()}>
                    отправить
                </button>
            </form>
            <Link to={'/admin'}>go to admin</Link>
        </div>

    );
}

export default GroupAddPage;