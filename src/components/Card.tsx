import { NavLink } from 'react-router-dom';
import { DataItem } from '../models';

interface CardProps {
    item: DataItem,
}

export default function Card({item}: CardProps) {
    if (item) {
        return (
            <div className='col-4'>
                <div className='card catalog-item-card'>
                    <img
                        src={item.images[0]}
                        className='card-img-top img-fluid'
                        alt={item.title}
                    />
                    <div className='card-body'>
                        <p className='card-text'>{item.title}</p>
                        <p className='card-text'>{item.price} руб.</p>
                        <NavLink
                            to={`/catalog/${item.id}`}
                            className='btn btn-outline-primary'
                        >
                            Заказать
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}