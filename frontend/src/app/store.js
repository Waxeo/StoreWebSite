import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'

// configuration du store Redux (Coffre fort de gestion des élements de notre application)
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    }, // On commence à définir ce qui va gérer les modifications de l'état du store. Les reducers sont des fonctions qui prennent l'état actuel et une action, puis retournent un nouvel état.
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware), // C'est un middleware qui aide à gérer les requêtes API (comme vérifier les erreurs et gérer les réponses).
    devTools: true // active les outils de développement de Redux. Ces outils permettent de voir ce qui se passe dans le store, ce qui est super utile pour le débogage et pour comprendre comment l'état change dans notre application.
})

setupListeners(store.dispatch)