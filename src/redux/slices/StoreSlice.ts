import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    DataItem,
    Category,
    ItemDetails,
    CartItemModel,
    OrderModel,
} from '../../models';

interface Error {
    message: string,
    errFunc: PayloadAction<string | number | OrderModel>,
}

interface InitialState {
    topSales: DataItem[],
    categories: Category[],
    activeCategoryId: number,
    categoryItems: DataItem[],
    currentProduct: ItemDetails | null,
    searchText: string,
    error: {
        topSales: Error | null,
        moreItem: Error | null,
        other: Error | null,
        categories: Error | null,
    },
    loading: {
        topSales: boolean,
        categories: boolean,
        categoryItem: boolean,
        moreItem: boolean,
        itemDetail: boolean,
        order: boolean,
    },
    cart: CartItemModel[],
    orderSuccess: boolean,
    end: boolean,
}

const initialState: InitialState = {
    topSales: [],
    categories: [],
    categoryItems: [],
    currentProduct: null,
    activeCategoryId: 0,
    searchText: '',
    error: {
        topSales: null,
        moreItem: null,
        other: null,
        categories: null,
    },
    loading: {
        topSales: true,
        categories: true,
        categoryItem: true,
        moreItem: false,
        itemDetail: false,
        order: false,
    },
    cart: [],
    orderSuccess: false,
    end: false,
};

const StoreSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        clearOrderSuccess(state) {
            state.orderSuccess = false;
        },
        getOrderSuccess(state) {
            state.loading.order = false;
            state.orderSuccess = true;
            state.error.other = null;
            state.cart = [];
            localStorage.removeItem('cart');
        },
        getTopSalesSuccess(state, action: PayloadAction<DataItem[]>) {
            state.loading.topSales = false;
            state.topSales = action.payload;
            state.error.topSales = null;
        },
        getCategoriesSuccess(state, action: PayloadAction<Category[]>) {
            state.loading.categories = false;
            state.categories = action.payload;
            state.error.categories = null;
        },
        getCategoryItemsSuccess(state, action: PayloadAction<DataItem[]>) {
            state.loading.categoryItem = false;
            state.categoryItems = action.payload;
            state.error.other = null;
        },
        getItemDetailsSuccess(state, action: PayloadAction<ItemDetails>) {
            state.loading.itemDetail = false;
            state.currentProduct = action.payload;
            state.error.other = null;
        },
        getTopSalesFailed(state, action: PayloadAction<Error>) {
            state.error.topSales = action.payload;
        },
        getMoreItemsFailed(state, action: PayloadAction<Error>) {
            state.error.moreItem = action.payload;
        },
        getCategoriesFailed(state, action: PayloadAction<Error>) {
            state.error.categories = action.payload;
        },
        getItemFailed(state, action: PayloadAction<Error>) {
            state.error.other = action.payload;
        },
        getItemLoading(state) {
            state.loading.categoryItem = true;
            state.error.other = null;
            state.end = false;
        },
        getMoreItemLoading(state) {
            state.loading.moreItem = true;
            state.error.moreItem = null;
        },
        getTopSaleLoading(state) {
            state.loading.topSales = true;
            state.error.topSales = null;
        },
        getCategoriesLoading(state) {
            state.loading.categories = true;
            state.error.categories = null;
            state.categories = [];
        },
        getDetailsLoading(state) {
            state.loading.itemDetail = true;
            state.error.other = null;
        },
        getOrderLoading(state) {
            state.loading.order = true;
            state.error.other = null;
        },
        addMoreItems(state, action: PayloadAction<DataItem[]>) {
            state.categoryItems.push(...action.payload);
            state.loading.moreItem = false;
            state.error.moreItem = null;
        },
        setPostEnd(state) {
            state.end = true;
        },
        setCategory(state, action: PayloadAction<number>) {
            state.activeCategoryId = action.payload;
            state.error.moreItem = null;
            state.loading.moreItem = false;
        },

        setSearch(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
        addCart(state, action: PayloadAction<CartItemModel>) {
            const item = state.cart.find(
                (el) => el.id === action.payload.id && el.size === action.payload.size
            );
            if (item) {
                const count = item.count;
                state.cart = state.cart.filter(
                    (el) =>
                        !(el.id === action.payload.id && el.size === action.payload.size)
                );
                action.payload.count += count;
            }
            state.cart.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        delCart(state, action: PayloadAction<CartItemModel>) {
            state.cart = state.cart.filter((el) => {
                return !(
                    el.id === action.payload.id && el.size === action.payload.size
                );
            });

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        changeCart(state, action: PayloadAction<CartItemModel>) {
            state.cart = state.cart.filter((el) => el.id != action.payload.id);
            state.cart.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateCart(state) {
            const data = localStorage.getItem('cart');
            if (data) {
                state.cart = JSON.parse(data);
            }
        },
    },
});

export const GET_TOP_SALES = 'store/getTopSales';
export const getTopSales = createAction(GET_TOP_SALES);
export const GET_CATEGORY = 'store/getCategory';
export const getCategory = createAction(GET_CATEGORY);
export const GET_ITEMS = 'store/getItems';
export const getItem = createAction<string>(GET_ITEMS);
export const GET_MORE_ITEMS = 'store/getMoreItems';
export const getMoreItems = createAction<number>(GET_MORE_ITEMS);
export const GET_SEARCH = 'store/getSearchItems';
export const getSearchItems = createAction<string>(GET_SEARCH);
export const GET_ITEM_DETAIL = 'store/getItemDetail';
export const getItemDetail = createAction<string | number>(GET_ITEM_DETAIL);
export const GET_ORDER = 'store/getOrder';
export const getOrder = createAction<OrderModel>(GET_ORDER);

export const {
    getTopSalesSuccess,
    getCategoriesSuccess,
    getCategoryItemsSuccess,
    getItemDetailsSuccess,
    getOrderSuccess,
    getItemFailed,
    getTopSalesFailed,
    getMoreItemsFailed,
    getCategoriesFailed,
    getItemLoading,
    getTopSaleLoading,
    getCategoriesLoading,
    getMoreItemLoading,
    getDetailsLoading,
    getOrderLoading,
    setPostEnd,
    setCategory,
    addMoreItems,
    setSearch,
    addCart,
    delCart,
    changeCart,
    updateCart,
    clearOrderSuccess,
} = StoreSlice.actions;

export default StoreSlice.reducer;
