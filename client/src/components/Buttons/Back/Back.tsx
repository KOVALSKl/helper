import { Link } from 'react-router-dom';
import './Back.scss'

type BackProps = {
    classNames?: string[]
    to: string,
}

function Back({ to, classNames = [] }: BackProps) {
    return (
        <Link
            to={to}
            className={['back-lnk', ...classNames].join(' ')}
        >
            <img
                src={require('../../../assets/left-arrow.svg').default}
                alt='go back button'
            />
            <span>назад</span>
        </Link>
    );
}

export default Back;