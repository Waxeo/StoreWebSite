import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

// Configurer la base de communication vers l’API.
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',  // inclut les cookies dans les requêtes pour permettre l’envoi du refresh token via cookie, nécessaire pour maintenir la session de l’utilisateur.
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

// Gestion des erreurs de sécurités pour s'assurer qu'on est bien toujours connectés
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // On envoi le refreshtoken pour avoir le nouveau token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {

            // Garder le nouveau token en mémoire
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // test le query original avec le nouveau token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

// Creation de notre assistant d'utilisation de l'API en lui spécifiant qu'il sera principalement utile pour l'affichage des Notes et des Users 
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})