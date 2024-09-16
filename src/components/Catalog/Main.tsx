import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCategory, getItem } from '../../redux/slices/StoreSlice';
import CatalogBody from './Body';
import CatalogFilter from './Categories';
import CatalogAddMore from './AddMore';

export default function CatalogMain() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading.categoryItem);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getItem('0'));
    }, [dispatch]);

    return (
        <section className='catalog'>
            <h2 className='text-center'>Каталог</h2>
            <CatalogFilter />
            <CatalogBody />
            {!isLoading && <CatalogAddMore />}
        </section>
    );
}