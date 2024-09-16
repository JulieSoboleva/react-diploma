import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getTopSales } from '../redux/slices/StoreSlice';
import Card from './Card';
import Loader from './Loader/Loader';
import Error from './Error';

export default function TopSales() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading.topSales);
    const isError = useAppSelector((state) => state.error.topSales);
    const hits = useAppSelector((state) => state.topSales);

    useEffect(() => {
        dispatch(getTopSales());
    }, [dispatch]);

    return (
        <section className='top-sales'>
            <h2 className='text-center'>Хиты продаж!</h2>
            {isLoading && !isError && <Loader />}
            {isError && <Error error={isError} />}
            {hits && hits.length > 0 &&
                <div className='row'>
                    {hits.map((card) => <Card item={card} key={card.id} />)}
                </div>
            }
        </section>
    );
}
