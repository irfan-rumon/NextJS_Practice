import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

// const persistConfig = {
//     key: 'auth-sample',
//     storage,
// }

const rootReducer = combineReducers({
    authReducer
});

export const store = configureStore({
    reducer: rootReducer,
});
   
//const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [
//                     'persist/PERSIST',
//                     'persist/REHYDRATE',
//                     'persist/PAUSE',
//                     'persist/REGISTER',
//                     'persist/PURGE',
//                 ],
//             },
//         }),
// });
