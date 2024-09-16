import { NavLink, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSearchItems, setSearch } from '../../redux/slices/StoreSlice';
import logo from '../../assets/header-logo.png';
import Banner from '../Banner/Banner';
import './header.scss';

export default function Header() {
    const searchForm = useRef<HTMLFormElement>(null);
    const cartList = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <header className='container'>
            <div className='row'>
                <div className='col'>
                    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                        <NavLink className='navbar-brand' to='/'>
                            <img src={logo} alt='Bosa Noga' />
                        </NavLink>
                        <div className='collapse navbar-collapse' id='navbarMain'>
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/'>
                                        Главная
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/catalog'>
                                        Каталог
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/about'>
                                        О магазине
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/contacts'>
                                        Контакты
                                    </NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className='header-controls-pics'>
                                    <div
                                        data-id='search-expander'
                                        className='header-controls-pic header-controls-search'
                                        onClick={() => {
                                            if (searchForm.current) {
                                                const text = (searchForm.current as HTMLFormElement)
                                                    .querySelector('input')
                                                    ?.value.trim();
                                                if (text) {
                                                    dispatch(setSearch(text));
                                                    dispatch(getSearchItems(text));
                                                    searchForm.current.reset();
                                                    navigate('/catalog');
                                                    return;
                                                }
                                                (
                                                    searchForm.current as HTMLFormElement
                                                ).classList.toggle('invisible');
                                                (searchForm.current as HTMLFormElement)
                                                    .querySelector('input')
                                                    ?.focus();
                                            }
                                        }}
                                    ></div>

                                    <NavLink to='/cart'>
                                        <div className='header-controls-pic header-controls-cart'>
                                            {cartList.length > 0 && (
                                                <div className='header-controls-cart-full'>
                                                    {cartList.length}
                                                </div>
                                            )}
                                            <div className='header-controls-cart-menu'></div>
                                        </div>
                                    </NavLink>
                                </div>
                                <form
                                    data-id='search-form'
                                    className='header-controls-search-form form-inline invisible'
                                    ref={searchForm}
                                    onSubmit={(evt) => {
                                        evt.preventDefault();
                                    }}
                                >
                                    <input className='form-control' placeholder='Поиск' />
                                </form>
                            </div>
                        </div>
                    </nav>
                    <Banner />
                </div>
            </div>
        </header>
    );
}