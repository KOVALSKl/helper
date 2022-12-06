import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { addSymptom, deleteSymptom } from '../../../redux/slices/selectedSymtpomsSlice';
import { Symptom } from '../../../types/types';
import './SymptomItem.scss'

type SymptomItemProps = {
    item: Symptom,
    classNames?: string[],
}

function SymptomItem({ item, classNames = [] }: SymptomItemProps) {

    const selectedSymtpoms = useAppSelector(state => state.selectedSymtpoms.value);

    function isSelected(): boolean {
        return selectedSymtpoms.some(symptomID => symptomID === item.id);
    }

    const dispatch = useAppDispatch();

    return (
        <li className={['list-item', ...classNames].join(' ')}>
            <label
                htmlFor={`item__checkbox-${item.id}`}
                style={{ color: (!isSelected()) ? '#000000' : '#14a433' }}>
                {item.name}
                <div className='checkbox'>
                    <input
                        type='checkbox'
                        id={`item__checkbox-${item.id}`}
                        className='select-item-checkbox'
                        checked={isSelected()}
                        onChange={() => {
                            (!isSelected())
                                ? dispatch(addSymptom(item.id))
                                : dispatch(deleteSymptom(item.id))
                        }}
                    />
                    <label htmlFor={`item__checkbox-${item.id}`}>
                    </label>
                </div>
            </label>
        </li >
    );
}

export default SymptomItem;