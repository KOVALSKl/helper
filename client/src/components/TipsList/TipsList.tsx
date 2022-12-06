import { memo } from 'react';
import { DiseaseTip, DiseaseTipType } from '../../types/types';
import DiseaseTipItem from '../ListItems/DiseaseTipItem/DiseaseTipItem';
import './TipsList.scss'

type TipsListProps = {
    list: DiseaseTip[];
    tipType: DiseaseTipType;
    classNames?: string[];
    updateList?: (list: DiseaseTip[]) => void;
}


function TipsList({ list, tipType, updateList, classNames = [] }: TipsListProps) {

    function updateTipValue(item: DiseaseTip, value: string) {
        if (item && updateList) {
            updateList(list.map((tip) => {
                if (tip === item) tip.value = value;
                return tip;
            }))
        }
    }

    return (
        <ul className={['tips-list', ...classNames].join(' ')}>
            {list.map((item, index) => {
                return (
                    <DiseaseTipItem
                        item={item}
                        key={index}
                        tipType={tipType}
                        updateTipValue={updateTipValue}
                    />
                )
            })}
        </ul>
    );
}

export default memo(TipsList);