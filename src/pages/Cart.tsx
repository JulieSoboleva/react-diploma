import CartInfo from '../components/Cart/Info';
import CartOrder from '../components/Cart/Order';

export default function Cart() {
    return (
        <main className='container'>
            <div className='row'>
                <div className='col'>
                    <CartInfo />
                    <CartOrder />
                </div>
            </div>
        </main>
    );
}