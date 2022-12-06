import { useNavigate } from 'react-router-dom';
import './MoveOn.scss'

type MoveOnProps = {
    to: string;
    disabled?: boolean;
    classNames?: string[];
}

function MoveOn({ to, disabled = false, classNames = [] }: MoveOnProps) {

    const navigate = useNavigate();

    return (
        <button
            disabled={disabled}
            onClick={() => navigate(to)}
            className={['move-on-lnk', ...classNames].join(' ')}
        >
            вперед
        </button>
    );
}

export default MoveOn;