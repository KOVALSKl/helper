import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { useGetSymptomsGroupsQuery } from '../../redux/api/symptomsApi';
import { Symptom } from '../../types/types';
import SymptomItem from '../ListItems/SymptomItem/SymptomItem';
import './SymptomsList.scss'

type SymptomsListProps = {
    list: Symptom[];
}

function SymptomsList({ list }: SymptomsListProps) {

    const { data, error, isLoading } = useGetSymptomsGroupsQuery();

    const groupedSymptoms = data?.map((item) => {

        const groupSymptoms = list.filter((symptom) => symptom.symptomsGroupId === item.id)
        if (groupSymptoms.length !== 0) {
            return {
                name: item.name,
                id: item.id,
                group: groupSymptoms,
            }
        }
    })

    let loading = isLoading || !data || !groupedSymptoms;
    let isSymptomsEmpty = list.length === 0;

    return (
        <ul className={['groups list', (isSymptomsEmpty || loading) ? 'empty' : 'full'].join(' ')}>
            {
                (loading)
                    ? <SyncLoader />
                    : (isSymptomsEmpty)
                        ? <li className='nothing-found-item'>Ничего не найдено</li>
                        : groupedSymptoms?.map((group) => {
                            if (group)
                                return (
                                    <li className='group' key={group.id}>
                                        <span className='group__title'>{group.name}</span>
                                        <ul className='symptoms'>
                                            {
                                                group.group.map((symptom) => {
                                                    return (
                                                        <SymptomItem
                                                            item={symptom}
                                                            key={symptom.id}
                                                            classNames={['symptom']} />
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                        })
            }
        </ul>
    );
}

export default SymptomsList;