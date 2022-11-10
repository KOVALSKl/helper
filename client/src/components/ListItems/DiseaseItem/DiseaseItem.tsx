import { useEffect, useState } from 'react'
import { Disease } from '../../../types/types';
import './DiseaseItem.scss'


function DiseaseItem({ item }: { item: Disease }) {

    const [active, setActive] = useState<boolean>(false);

    function getItemColor(): string {
        if (item.probability) {
            return (item.probability > 80)
                ? '#CE813A'
                : (item.probability < 80 && item.probability > 60)
                    ? '#C7C135'
                    : '#0FA958'
        }
        return '';
    }

    //TODO: accordion to read disease info

    return (
        <li className='item'>
            <div className={['content', (active) ? 'active' : ''].join(' ')}>
                <div className="item-header">
                    <div className="title">
                        <h2>{item.name}</h2>
                        <span style={{ color: getItemColor() }}>{item.probability}%</span>
                    </div>
                </div>
                <div className='main-content'>
                    <div className="description">
                        <h3 className='main-content__header'>
                            Description
                        </h3>
                        nvsjdnvjkdnfvsjdfnvsjkdf
                        fvsdjfknvjsdfnvjkndfjnvjdf
                        dfjnvjskndfjkvnjkdfnjksdfjnvkjsd
                        fvjndfkjnvskjdnfvjsndfjkvnsjkdnfv
                        sdfnvjndjfknvjskdfnjvks
                        fjnvsjkdfnjknfkjgsljfnvkdfn
                        sdfvnsdfjnsfnjnfjnjnjsfjn
                        sdfnvjndjfknvjskdfnjvks
                        fjnvsjkdfnjknfkjgsljfnvkdfn
                        sdfvnsdfjnsfnjnfjnjnjsfjn
                    </div>
                    <div className="tips">
                        <h3 className='main-content__header'>
                            Tips
                        </h3>
                        {item.tips}
                    </div>
                </div>
            </div>
            <button className='show-more-rect' onClick={(e) => setActive(!active)}>
                {(active)
                    ? 'close'
                    : 'show more'}
            </button>
        </li>
    );
}

export default DiseaseItem;