import { useAppSelector } from '../../hooks';
import Loader from '../Loader/Loader';
import Error from '../Error';
import Card from '../Card';

export default function CatalogBody() {
    const items = useAppSelector((state) => state.categoryItems);
    const isLoading = useAppSelector((state) => state.loading.categoryItem);
    const isError = useAppSelector((state) => state.error.other);

    if (isError) return <Error error={isError} />;
    if (isLoading) return <Loader />;
    if (!items.length) {
        return (
            <div className='error-message__wrapper'>
                <div className='error-message'>
                    <h2>Товаров с заданным названием не найдено</h2>
                </div>
            </div>
        );
    }
    return (
        <div className='row'>
            {items.map((item) => (
                <Card item={item} key={item.id + item.title} />
            ))}
        </div>
    );
}