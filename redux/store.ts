import { combineReducers, configureStore, Tuple } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import playerSlice from './reducers/playerSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';


const rootReducer = combineReducers({ 
    player:playerSlice,
  })

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export const persistor = persistStore(store)