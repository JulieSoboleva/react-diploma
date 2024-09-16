import { useAppSelector } from '../../hooks';
import CartItem from './Item';

export default function CartInfo() {
    const cartList = useAppSelector((state) => state.cart);

    const sum = cartList.reduce((a, b) => a + b.count * b.price, 0);
    return (
        <section className='cart'>
            <h2 className='text-center'>Корзина</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Название</th>
                        <th scope='col'>Размер</th>
                        <th scope='col'>Кол-во</th>
                        <th scope='col'>Стоимость</th>
                        <th scope='col'>Итого</th>
                        <th scope='col'>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {cartList.map((item, index) => (
                        <CartItem 
                            item={item}
                            index={index + 1}
                            key={item.id + item.size}
                        />
                    ))}
                    <tr>
                        <td colSpan={5} className='text-right'>
                            Общая стоимость
                        </td>
                        <td>{sum} руб.</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}