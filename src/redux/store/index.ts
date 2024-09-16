import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import StoreSlice from '../slices/StoreSlice';
import { sagas } from '../sagas';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: StoreSlice,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
