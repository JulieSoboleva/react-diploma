import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMoreItems } from '../../redux/slices/StoreSlice';
import Loader from '../Loader/Loader';
import Error from '../Error';
import './catalog.scss';

export default function CatalogAddMore() {
    const currentId = useAppSelector((state) => state.activeCategoryId);
    const available = useAppSelector((state) => state.end);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading.moreItem);
    const isError = useAppSelector((state) => state.error.moreItem);
    const items = useAppSelector((state) => state.categoryItems);

    if (isError) return <Error error={isError} />;
    if (isLoading) return <Loader />;
    if (available) return null;
    if (items.length > 5) {
        return (
            <div className='text-center'>
                { }
                <button
                    className='btn btn-outline-primary'
                    onClick={() => {
                        dispatch(getMoreItems(currentId));
                    }}
                >
                    Загрузить ещё
                </button>
            </div>
        );
    }
}