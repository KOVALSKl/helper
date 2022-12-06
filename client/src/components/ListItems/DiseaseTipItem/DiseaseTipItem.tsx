import { useEffect, useMemo, useState } from 'react';
import { DiseaseTip, DiseaseTipType } from '../../../types/types';
import './DiseaseTipItem.scss'

type DiseaseTipItemProps = {
    item: DiseaseTip;
    tipType: DiseaseTipType;
    updateTipValue?: (item: DiseaseTip, value: string) => void;
    classNames?: string[];
}

function DiseaseTipItem({ item, tipType, updateTipValue, classNames = [] }: DiseaseTipItemProps) {

    const [tipValue, setTipValue] = useState<string>(item.value);

    useEffect(() => {
        if (updateTipValue) updateTipValue(item, tipValue);
    }, [tipValue])

    return (
        <li className={["tip-item", ...classNames].join(' ')}>
            {
                (tipType === DiseaseTipType.TOEDIT)
                    ? <textarea
                        value={tipValue}
                        placeholder='описание совета'
                        onChange={(e) => setTipValue(e.target.value)}
                    ></textarea>
                    : <span className='tip-text'>
                        <span className='green-circle'></span>
                        {item.value}
                    </span>
            }
        </li>
    );
}

export default DiseaseTipItem;