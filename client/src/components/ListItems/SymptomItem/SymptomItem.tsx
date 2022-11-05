import { useEffect, useState } from 'react';
import { Symptom } from '../../../types/types';
import './SymptomItem.scss'

function SymptomItem({ item }: { item: Symptom }) {

    const [checked, setChecked] = useState<boolean>(false);

    return (
        <li className='symptom-list-item'>
            <label
                htmlFor={`item__checkbox-${item.id}`}
                style={{ color: (!checked) ? '#000000' : '#14a433' }}>
                {item.name}
                <div className='checkbox'>
                    <input
                        type='checkbox'
                        id={`item__checkbox-${item.id}`}
                        className='select-item-checkbox'
                        onChange={() => { setChecked(!checked) }}
                    />
                    <label htmlFor={`item__checkbox-${item.id}`}>
                    </label>
                </div>
            </label>
        </li >
    );
}

export default SymptomItem;