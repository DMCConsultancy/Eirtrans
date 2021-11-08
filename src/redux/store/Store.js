import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import root from '../reducer/Root';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'observeNow',
    storage: AsyncStorage,
    // blacklist: ['filter_reducer'],
};

const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

const persistor = persistStore(store);

export { store, persistor };