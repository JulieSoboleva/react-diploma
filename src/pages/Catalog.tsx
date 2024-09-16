import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCategory, getItem } from '../redux/slices/StoreSlice';
import CatalogMenu from '../components/Catalog/Categories';
import CatalogAddMore from '../components/Catalog/AddMore';
import CatalogBody from '../components/Catalog/Body';
import CatalogSearch from '../components/Catalog/Search';

export default function Catalog() {
    const isLoading = useAppSelector((state) => state.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategory());
        dispatch(getItem('0'));
    }, [dispatch]);

    return (
        <main className='container'>
            <div className='row'>
                <div className='col'>
                    <h2 className='text-center'>Каталог</h2>
                    <CatalogSearch />
                    <CatalogMenu />
                    <CatalogBody />
                    {!isLoading.categoryItem && <CatalogAddMore />}
                </div>
            </div>
        </main>
    );
}
