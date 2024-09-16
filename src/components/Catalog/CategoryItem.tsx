import { Link } from 'react-router-dom';
import { Category } from '../../models';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCategory } from '../../redux/slices/StoreSlice';

interface CategoryItemProps { 
    category: Category,
}

export default function CategoryItem({ category }: CategoryItemProps) {
    const currentId = useAppSelector((state) => state.activeCategoryId);
    const dispatch = useAppDispatch();

    const active = category.id === currentId ? 'nav-link active' : 'nav-link';

    return (
        <li className='nav-item'>
            <Link
                className={active}
                to='#catalog'
                onClick={() => {
                    dispatch(setCategory(category.id));
                }}
            >
                {category.title}
            </Link>
        </li>
    );
}