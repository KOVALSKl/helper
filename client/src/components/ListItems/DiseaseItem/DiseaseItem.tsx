import { useEffect, useState } from 'react'
import { Disease, DiseaseTipType } from '../../../types/types';
import TipsList from '../../TipsList/TipsList';
import './DiseaseItem.scss'


function DiseaseItem({ item }: { item: Disease }) {

    const [active, setActive] = useState<boolean>(false);

    function getItemColor(): string {
        if (item.distance) {
            return (item.distance > 12)
                ? '#CE813A'
                : (item.distance <= 12 && item.distance > 0)
                    ? '#C7C135'
                    : '#0FA958'
        }
        return '';
    }

    useEffect(() => {
        if (!active) {
            let element = document.getElementById(`item-content-${item.id}`);
            if (element && element.scrollTop !== 0) {
                element.scrollTop = element.offsetTop;
            }
        }
    }, [active])

    return (
        <li className='item'>
            <div
                className={['content', (active) ? 'active' : ''].join(' ')}
                id={`item-content-${item.id}`}
            >
                <div className="item-header">
                    <div className="title">
                        <h2>{item.name}</h2>
                        <span style={{ color: getItemColor() }}>{item.distance}</span>
                    </div>
                </div>
                <div className='main-content'>
                    <div
                        className={['description', (active) ? 'collapse' : ''].join(' ')}
                        id={`item-description-${item.id}`}
                    >
                        <h3 className='main-content__header'>
                            Описание
                        </h3>
                        {item.description}
                    </div>
                    <div className="tips">
                        <h3 className='main-content__header'>
                            Советы
                            <TipsList
                                list={item.tips}
                                tipType={DiseaseTipType.TOSHOW}
                            />
                        </h3>
                    </div>
                </div>
            </div>
            <button className='show-more-rect' onClick={(e) => setActive(!active)}>
                {(active)
                    ? 'свернуть'
                    : 'показать'}
            </button>
        </li >
    );
}

export default DiseaseItem;