import { Link } from 'react-router-dom';
import { CartItemModel } from '../../models';
import { useAppDispatch } from '../../hooks';
import { delCart } from '../../redux/slices/StoreSlice';

interface CartItemProps {
    item: CartItemModel,
    index: number,
}

export default function CartItem({item, index}: CartItemProps) {
    const dispatch = useAppDispatch();
    
    return (
        <tr>
            <td scope='row'>{index}</td>
            <td>
                <Link to={`/catalog/${item.id}`} className='nav-link'>
                    {item.title}
                </Link>
            </td>
            <td>{item.size}</td>
            <td>{item.count}</td>
            <td>{item.price} руб.</td>
            <td>{item.price * item.count} руб.</td>
            <td>
                <button
                    className='btn btn-outline-danger btn-sm'
                    onClick={() => dispatch(delCart(item))}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
}