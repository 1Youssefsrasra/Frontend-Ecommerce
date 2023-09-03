import { createContext, useReducer } from "react";

export const ProductContext = createContext()

export const productReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS': return{ products: action.payload}
        case 'CREATE_PRODUCT': return{ products: [action.payload, ...state.products]}
        case 'DELETE_PRODUCT': return{products: state.products.filter((w)=> w._id !== action.payload._id) }
        default: return state
    }
}


const ProductContextProvider = ( {children}) => {
    
    const [state, dispatch] = useReducer( productReducer, {
        products: null
    })
    
    return (     
        <ProductContext.Provider value={{...state, dispatch}}>
            {children} 
        </ProductContext.Provider>
     );
}
 
export default ProductContextProvider;