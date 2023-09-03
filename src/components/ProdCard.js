import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCart } from 'react-use-cart';
import { useAuthContext } from "../hooks/useAuthContext";


export default function ProdCard({ product }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    const {addItem} = useCart();
    const {user}= useAuthContext();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenAndAddToCart = () => {
      if (user && user.role==='client'){
      addItem(product)}
      handleOpen();         // Call the handleOpen function 

    }

  return (
    <Card sx={{ maxWidth: 345, marginTop: "20px" }}>
      <CardMedia sx={{ height: 140 }} image="img01.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title} -{product.price}$
        </Typography> 
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
       
        <Button size="small"  onClick={handleOpenAndAddToCart} >Add to cart</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {user && (<Typography id="modal-modal-title" variant="h6" component="h2">
              Added to cart
            </Typography>)}
            
            {!user && (<Typography id="modal-modal-title" variant="h6" component="h2">
              You must be logged in
            </Typography>)}
          </Box>
        </Modal>
       
      </CardActions>
    </Card>
  );
}
