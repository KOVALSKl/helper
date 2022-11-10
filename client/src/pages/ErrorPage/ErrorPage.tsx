import { ErrorResponse } from '@remix-run/router';
import { useEffect } from 'react';
import { useRouteError, Link, useNavigate, useNavigation } from 'react-router-dom'
import './ErrorPage.scss'

function ErrorPage() {

    const error = useRouteError() as ErrorResponse;

    return (
        <div className="error-page">

            <h2 className='error-page__title'>Упс...</h2>
            <div className='error-page__content'>
                {(error)
                    ? <div className='error-info'>
                        <span>{error.statusText}</span>
                        <span className='status'>#{error.status}</span>
                    </div>
                    : <div>Что-то пошло не так</div>
                }
                <button
                    className='back-btn'
                    onClick={() => window.history.back()}>
                    <img
                        id='go-back-image'
                        src={require('../../assets/left-arrow.svg').default} />давай назад
                </button>
            </div>

        </div>
    );
}

export default ErrorPage;