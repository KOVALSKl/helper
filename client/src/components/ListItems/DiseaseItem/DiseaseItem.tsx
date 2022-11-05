import { Disease } from '../../../types/types';
import './DiseaseItem.scss'


function DiseaseItem({ item }: { item: Disease }) {
    return (
        <li>
            <span>ID:{item.id}</span>
            <span>Name:{item.name}</span>
            <div>Description:{item.description}</div>
        </li>
    );
}

export default DiseaseItem;