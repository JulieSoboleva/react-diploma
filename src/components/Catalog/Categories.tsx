import { useAppSelector } from '../../hooks';
import Loader from '../Loader/Loader';
import Error from '../Error';
import CategoryItem from './CategoryItem';

export default function Categories() {
  
    let categories = useAppSelector((state) => state.categories);
    const isLoading = useAppSelector((state) => state.loading.categories);
    const isError = useAppSelector((state) => state.error.categories);
    
    categories = [{ title: 'Все', id: 0 }, ...categories];
    
    return (
        <ul className='catalog-categories nav justify-content-center'>
            {isLoading && !isError && <Loader />}
            {isError && <Error error={isError} />}
            {categories.map((category) => (
                <CategoryItem category={category} key={category.id} />
            ))}
        </ul>
    );
}
