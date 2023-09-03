import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

const useProductContext = () => {
    const context = useContext(ProductContext)

        if(!context) {
            throw Error('useProductContext must be used inside a ProductContextProvider')
        }

    return ( context );
}
 
export default useProductContext;