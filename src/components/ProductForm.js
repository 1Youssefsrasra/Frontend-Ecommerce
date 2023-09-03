import { useState } from "react";
import useProductContext from "../hooks/useProductContext";
import {useAuthContext} from "../hooks/useAuthContext";

const ProductForm = () => {
    const [title, setTitle]= useState('')
    const [category, setCategory]= useState('')

    const [price, setPrice]= useState('')
    const [size, setSize]= useState('')
    const [error, setError]= useState('null')
    const {dispatch} = useProductContext()
    const [emptyfields, setEmptyfields] = useState([])
    const user = useAuthContext()


const hundleSubmit = async(e) => {
    e.preventDefault()

    if(!user){
        setError('You must be logged in')
        return
    }


    const product = {title,category, price, size}
    const response = await fetch('/api/products' , {
        method: 'POST',
        body: JSON.stringify(product),
        headers:{'Content-type': 'application/json'}
    })
    const json = await response.json()
    if (!response.ok){
        setError(json.error)
        setEmptyfields(json.emptyfields)
    }
    if(response.ok){
        setTitle('')
        setCategory('')
        setPrice('')
        setSize('')
        setError(null)
        setEmptyfields([]) 
        console.log('new product added', json)
        dispatch({type: 'CREATE_PRODUCT', payload: json})


    }
}


    return ( 
        <form className="create" onSubmit={hundleSubmit}>
            <h3>Add new product</h3>

            <label>Product title:</label>
            <input  type="text"
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                    className={emptyfields.includes('title') ? 'error' : ''}
            />


            <label>Product price:</label>
            <input  type="number"
                    onChange={(e) => setPrice(e.target.value)} 
                    value={price}
                    className={emptyfields.includes('price') ? 'error' : ''}
            />

            <label>Product size:</label>
            <input  type="text"
                    onChange={(e) => setSize(e.target.value)} 
                    value={size}
                    className={emptyfields.includes('size') ? 'error' : ''}
            />

<label>Product Category:</label>
                    <div class="radio-input">
                    <label>
                    <input
            type="radio"
            name="category"
            value="Men"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "Men"}
            className={emptyfields.includes("category") ? "error" : ""}
          />
                    <span>Men</span>
                    </label>
                    <label>
                    <input
            type="radio"
            name="category"
            value="Women"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "Women"}
            className={emptyfields.includes("category") ? "error" : ""}
          />
                    <span>Women</span>
                    </label>
                    <label>
                    <input
            type="radio"
            name="category"
            value="Kids"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "Kids"}
            className={emptyfields.includes("category") ? "error" : ""}
          />                    <span>Kids</span>
                    </label>
                    <span class="selection"></span>
                    </div>

        <button>Add product</button>
        {error && <div className="error">{error}</div> }

        </form>
     );
}
 
export default ProductForm;