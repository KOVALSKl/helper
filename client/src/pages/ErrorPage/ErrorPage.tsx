import { useRouteError } from 'react-router-dom'
import './ErrorPage.scss'

function ErrorPage() {

    const error = useRouteError() as Error;

    return (
        <div className="error-page">
            <h2 className='error-page__title'>Oops...</h2>
            <div className='error-page__content'>
                <div>Sorry an unexpected error has occurred</div>
                <div className='error-info'>
                    {error.name}: {error.message}
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;