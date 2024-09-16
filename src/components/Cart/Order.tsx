import { FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOrder } from "../../redux/slices/StoreSlice";
import Loader from "../Loader/Loader";
import Error from "../Error";
import './order.scss';

export default function CartOrder() {
    const orderSuccess = useAppSelector((state) => state.orderSuccess);
    const dispatch = useAppDispatch();
    const orderForm = useRef<HTMLFormElement>(null);
    const cartList = useAppSelector((state) => state.cart);
    const [orderData, setOrderData] = useState<{
        phone: string,
        address: string,
        rule: boolean,
    }>({ phone: "", address: "", rule: false });
    const [confirm, setConfirm] = useState<boolean>(false);
    const isLoading = useAppSelector((state) => state.loading.order);
    const isError = useAppSelector((state) => state.error.other);

    const sendOrder = (evt: FormEvent) => {
        evt.preventDefault();
        if (cartList.length < 1) {
            return;
        }
        const order = {
            owner: { 
                phone: orderData.phone,
                address: orderData.address
            },
            items: cartList,
        };
        if (cartList.length > 0) {
            dispatch(getOrder(order));
        }
        orderForm.current?.reset();
    };

    const checkConfirm = () =>
        setConfirm(
            [orderData.phone !== "", orderData.address !== "", orderData.rule].every(
                Boolean
            )
        );

    return (
        <section className="order">
            {orderSuccess && (
                <div className='order-success__wrapper'>
                    <div className="order-success">
                        <h2>Заказ успешно отправлен!</h2>
                        <span>Спасибо что выбрали наш магазин. Ждем Вас обратно.</span>
                    </div>
                </div>
            )}
            {isError && <Error error={isError} />}
            {isLoading && !isError && (
                <div className='order-success__wrapper'>
                    <div className="order-success">
                        <Loader />
                    </div>
                </div>
            )}
            {cartList.length > 0 && (<>
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
                    <form className="card-body" ref={orderForm} onSubmit={sendOrder}>
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                className="form-control"
                                id="phone"
                                placeholder="Ваш телефон"
                                required
                                onChange={(evt) => {
                                    const text = evt.target.value;
                                    if (text) {
                                        const data = orderData;
                                        data.phone = text.trim();
                                        setOrderData(data);
                                        checkConfirm();
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input
                                className="form-control"
                                id="address"
                                placeholder="Адрес доставки"
                                required
                                onChange={(evt) => {
                                    const text = evt.target.value;
                                    if (text) {
                                        const data = orderData;
                                        data.address = text.trim();
                                        setOrderData(data);
                                        checkConfirm();
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="agreement"
                                required
                                onChange={(evt) => {
                                    const data = orderData;
                                    data.rule = evt.target.checked;
                                    setOrderData(data);
                                    checkConfirm();
                                }}
                            />
                            <label className="form-check-label" htmlFor="agreement">
                                Согласен с правилами доставки
                            </label>
                        </div>
                        <button
                            type="submit"
                            className={
                                confirm
                                    ? "btn btn-outline-secondary"
                                    : "btn btn-outline-secondary disabled"
                            }
                        >
                            Оформить
                        </button>
                    </form>
                </div>
            </>)}
        </section>
    );
}