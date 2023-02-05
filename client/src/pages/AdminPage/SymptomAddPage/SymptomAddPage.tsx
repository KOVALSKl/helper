import { useEffect, useState } from 'react';
import { Symptom } from '../../../types/types';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './SymptomAddPage.scss'
import { useAddSymptomMutation, useDeleteSymptomMutation, useGetSymptomsGroupsQuery, useGetSymptomsQuery, useUpdateSymptomMutation } from '../../../redux/api/symptomsApi';
import { SyncLoader } from 'react-spinners';

function SymptomAddPage() {

    const [symptomName, setSymptomName] = useState<string>('');
    const [group, setGroup] = useState<number | null>(null);

    const [disabled, setDisabled] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingItem, setEditingItem] = useState<Symptom | null>()

    const symptomsGroup = useGetSymptomsGroupsQuery();
    const addedSymptoms = useGetSymptomsQuery();
    const [addSymptom, addedSymptom] = useAddSymptomMutation();
    const [updateSymptom, updatedSymptom] = useUpdateSymptomMutation();
    const [deleteSymptom, deleteInfo] = useDeleteSymptomMutation();

    useEffect(() => {
        if (isEditing && editingItem) {
            setSymptomName(editingItem.name);
            setGroup(editingItem.symptomsGroupId);
        } else
            return;
    }, [isEditing, editingItem])

    function closeEditing() {
        setEditingItem(null);
        setIsEditing(false);

        setSymptomName('');
        setGroup(null);
    }

    function submit() {
        if (symptomName !== '' && group) {
            if (isEditing && editingItem) {
                updateSymptom({
                    id: editingItem.id,
                    name: symptomName,
                    symptomsGroupId: group,
                })
            } else {
                addSymptom({
                    name: symptomName,
                    symptomsGroupId: group,
                });
            }
            closeEditing();
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
            <div className="content-block">
                <h2 className='page-title'>
                    {isEditing ? 'Изменить' : 'Добавить'} симптом
                    {!isEditing
                        ? null
                        : <button
                            className='close-editing'
                            onClick={closeEditing}
                        >
                            <img src={require('../../../assets/close-btn.svg').default} />
                        </button>
                    }
                </h2>

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
                    {(!symptomsGroup.data)
                        ? <SyncLoader />
                        : <ul className='group-list'>
                            {symptomsGroup.data.map((item) => {
                                return (
                                    <li className='group-item' key={item.id}>
                                        <input
                                            name='group'
                                            type='radio'
                                            value={item.id}
                                            id={`group-item__checkbox-${item.id}`}
                                            onChange={(e) => setGroup(item.id)}
                                            checked={group === item.id} />
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
                        {isEditing ? 'изменить' : 'отправить'}
                    </button>
                </form>
            </div>
            <div className='content-block'>
                <h2 className='page-title'>Добавленные симптомы</h2>
                <ul className='symptoms-list'>
                    {addedSymptoms.data?.length === 0 ?
                        <li>No data</li>
                        : addedSymptoms.data?.map((item) => {
                            return (
                                <li className='symptom' key={item.id}>
                                    <span className='symptom-info'>
                                        {item.name}
                                    </span>
                                    <div className="action-buttons">
                                        <button
                                            className='action-buttons__btn' id='edit'
                                            onClick={() => {
                                                setIsEditing(true);
                                                setEditingItem(item);
                                            }}
                                        >
                                            <img src={require('../../../assets/edit-btn.svg').default} />
                                        </button>
                                        <button
                                            className='action-buttons__btn'
                                            id='delete'
                                            disabled={isEditing}
                                            onClick={() => deleteSymptom(item.id)}
                                        >
                                            <img src={require('../../../assets/delete-btn.svg').default} />
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Link to={'/admin'} className='back-btn'>
                <img src={require('../../../assets/left-arrow.svg').default} />
            </Link>
        </div>

    );
}

export default SymptomAddPage;