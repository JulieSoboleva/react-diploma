import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addCart, getItemDetail } from '../redux/slices/StoreSlice';
import Loader from '../components/Loader/Loader';
import Error from '../components/Error';

export default function Product() {
    const { id } = useParams();
    const itemDetails = useAppSelector((state) => state.currentProduct);
    const isLoading = useAppSelector((state) => state.loading.itemDetail);
    const isError = useAppSelector((state) => state.error.other);
    const dispatch = useAppDispatch();
    const [selectedSize, setSize] = useState<string | null>(null);
    const [selectedCount, setCount] = useState<number>(1);
    const navigate = useNavigate();
    const hasAvailableSize = itemDetails?.sizes.filter(
        (size) => size.available === true
    );

    const chooseSize = (evt: MouseEvent) => {
        const target = evt.target as HTMLSpanElement;
        target.classList.toggle('selected');
        setSize(target.textContent);
        if (!target.classList.contains('selected')) {
            setSize(null);
        }
    };

    const addToCart = () => {
        if (itemDetails && selectedCount && selectedSize) {
            const item = {
                id: itemDetails.id,
                title: itemDetails.title,
                size: selectedSize,
                price: itemDetails.price,
                count: selectedCount,
            };
            dispatch(addCart(item));
            navigate('/cart');
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(getItemDetail(id));
        }
    }, [dispatch, id]);
    if (isError || isLoading) {
        return (
            <main className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='catalog-spaces'>
                            {isError && <Error error={isError} />}
                            {!isError && isLoading && <Loader />}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='container'>
            <div className='row'>
                <div className='col'>
                    <section className='catalog-item'>
                        <h2 className='text-center'>{itemDetails?.title}</h2>
                        <div className='row'>
                            <div className='col-5'>
                                <img src={itemDetails?.images[0]} className='img-fluid' alt='' />
                            </div>
                            <div className='col-7 align-middle'>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <td>Артикул</td>
                                            <td>{itemDetails?.sku}</td>
                                        </tr>
                                        <tr>
                                            <td>Производитель</td>
                                            <td>{itemDetails?.manufacturer}</td>
                                        </tr>
                                        <tr>
                                            <td>Цвет</td>
                                            <td>{itemDetails?.color}</td>
                                        </tr>
                                        <tr>
                                            <td>Материалы</td>
                                            <td>{itemDetails?.material}</td>
                                        </tr>
                                        <tr>
                                            <td>Сезон</td>
                                            <td>{itemDetails?.season}</td>
                                        </tr>
                                        <tr>
                                            <td>Повод</td>
                                            <td>{itemDetails?.reason}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='text-center'>
                                    <p>
                                        Размеры в наличии:{' '}
                                        {itemDetails?.sizes.map((size) => {
                                            if (size.available) {
                                                return (
                                                    <span
                                                        className={
                                                            size.size === selectedSize
                                                                ? 'catalog-item-size selected'
                                                                : 'catalog-item-size'
                                                        }
                                                        key={itemDetails.id + size.size}
                                                        onClick={chooseSize}
                                                    >
                                                        {size.size}
                                                    </span>
                                                );
                                            }
                                        })}
                                    </p>
                                    {hasAvailableSize && hasAvailableSize?.length > 0 && (
                                        <p>
                                            Количество:{' '}
                                            <span className='btn-group btn-group-sm pl-2'>
                                                <button
                                                    className={
                                                        selectedCount > 1 && selectedSize
                                                            ? 'btn btn-secondary'
                                                            : 'btn btn-secondary disabled'
                                                    }
                                                    onClick={() => {
                                                        setCount(selectedCount - 1);
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span className='btn btn-outline-primary'>
                                                    {selectedCount}
                                                </span>
                                                <button
                                                    className={
                                                        selectedCount < 10 && selectedSize
                                                            ? 'btn btn-secondary'
                                                            : 'btn btn-secondary disabled'
                                                    }
                                                    onClick={() => {
                                                        setCount(selectedCount + 1);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </span>
                                        </p>
                                    )}
                                </div>
                                {hasAvailableSize && hasAvailableSize?.length > 0 && (
                                    <button
                                        className={
                                            selectedSize
                                                ? 'btn btn-danger btn-block btn-lg'
                                                : 'btn btn-danger btn-block btn-lg disabled'
                                        }
                                        onClick={addToCart}
                                    >
                                        В корзину
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
