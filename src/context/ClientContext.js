import { createContext, useReducer } from "react";

export const ClientContext = createContext()

export const clientReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CLIENTS': return{ clients: action.payload}
        case 'CREATE_CLIENT': return{ clients: [action.payload, ...state.clients]}
        case 'DELETE_CLIENT': return{clients: state.clients.filter((w)=> w._id !== action.payload._id) }
        default: return state
    }
}


const ClientContextProvider = ({children}) => {
        const [state, dispatch] = useReducer( clientReducer, {
            clients: null
        })
        
        return (     
            <ClientContext.Provider value={{...state, dispatch}}>
                {children} 
            </ClientContext.Provider>
         );
     
}
 
export default ClientContextProvider;