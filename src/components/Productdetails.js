import useProductContext from "../hooks/useProductContext";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();

  const handleClick = async () => {
    const response = await fetch("/api/products/" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product-details">
      <div className="image">
        <img
          src="img01.jpg"
          alt="product"
        />
      </div>
      <h3>{product.title}</h3>
      <div className="product-cell category">
        <span className="cell-label">Category:</span>{product.category}
      </div>

      <div className="product-cell size">
        <span className="cell-label">Size:</span>
        {product.size}
      </div>
      <div className="product-cell stock">
        <span className="cell-label">Stock:</span>10
      </div>
      <div className="product-cell price">
        <span className="cell-label">Price:</span>
        {product.price} $
      </div>
      <span onClick={handleClick}>
        <DeleteIcon />
      </span>
    </div>
  );
};

export default ProductDetails;
