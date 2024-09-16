import { useAppDispatch } from '../hooks';
import { IError } from '../models';

interface ErrorProps {
    error: IError,
}

export default function Error({error}: ErrorProps) {
    const { message, errFunc } = error;
    const dispatch = useAppDispatch();

    return (
        <div className='error-message__wrapper'>
            <div className='error-message'>
                <h2>{message}</h2>
                <button className='error-button' onClick={() => dispatch(errFunc)}>
                    Повторить
                </button>
            </div>
        </div>
    );
}
