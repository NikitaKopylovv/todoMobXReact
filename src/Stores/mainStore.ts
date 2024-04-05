import { createContext, useContext } from "react";
import { toDoStore } from './toDoStore';

const store = {
    toDoStore: toDoStore,
};

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store;