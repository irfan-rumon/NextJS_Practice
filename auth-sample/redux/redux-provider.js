"use client"

import { store} from "./store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

export function ReduxProvider( {children} ){

   let persistor = persistStore(store);

   return   <Provider store={store}>
                  <PersistGate  persistor={persistor}>
                      {children}
                  </PersistGate>
            </Provider>
};