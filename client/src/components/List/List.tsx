
import { memo } from 'react';
import { Disease, Symptom } from '../../types/types';
import DiseaseItem from '../ListItems/DiseaseItem/DiseaseItem';
import SymptomItem from '../ListItems/SymptomItem/SymptomItem';
import './List.scss'

type ListProps<ObjectType> = {
    list: ObjectType[];
}

function List<ObjectType,>({ list }: ListProps<ObjectType>) {

    return (
        <ul className='list'>
            {
                (list.length > 0)
                    ? list.map((item, index) => {
                        if (item instanceof Symptom)
                            return (<SymptomItem
                                item={item}
                                key={item.id}
                            />)

                        else if (item instanceof Disease)
                            return (<DiseaseItem item={item} key={item.id} />)
                    })
                    : <li className='nothing-found-item'>
                        Ничего не найдено
                    </li>
            }
        </ul>
    );
}

export default memo(List);