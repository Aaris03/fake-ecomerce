import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { PlusIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import './ProductCard.css';

function ProductCard(product) {

  const context = useContext(ShoppingCartContext);

  const handleItems = (id) => {
    const productsInCart = context.cart
    const index = [];
    
    productsInCart.map((item) => {
      index.push(item.id)
    })

    if(index.includes(id)){
      alert("Si quieres elminar un producto, debes retirarlo del carrito de compra")
    }else{
      const array = context.items.filter((item)=>{
        return item.id !== id 
      });
    
      fetch("https://api.escuelajs.co/api/v1/products/"+id, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        }})
      .then(() => {
        context.setItems(array)
        if(context.detailsOpen && context.productDetails.id === id){
          context.closeAsideDetails();
        }
      })
    }
  }

  const openAsideProductDetails = (e,data) => {
    const className = e.target.classList[0];
    const nodeName = e.target.nodeName;

    if(!(className == "delete-btn-product") && !(nodeName == "BUTTON")){
      context.openAsideDetails()
      context.setProductDetails(data)
    }
  }

  const existInCart = (product) => { 
    const addCart = context.cart
    const validate = addCart.find((item)=>item.id === product.id)

    return validate === undefined
  }

  const addProductToCart = (product) => {
    let addCart = context.cart
    if(existInCart(product)){
      addCart.push(product)
      context.setCart(addCart)
      context.setCount(context.count + 1)
    }else{  
      const array = context.cart;
      const index = array.indexOf(product);
      array.splice(index,1);

      context.setCart(array)
      context.setCount(context.count - 1)
    }
  }
  
  return (
    <>
        <div className='product-card' onClick={(e) =>openAsideProductDetails(e, product.product)}>
            <figure >
                <div className='interaction-box'>
                    <div className={`visible-btn-product  ${
                      existInCart(product.product) ? "hover:bg-black":"bg-green-500"
                    }`}>
                      {existInCart(product.product) ? 
                      <PlusIcon className='hover:text-white'></PlusIcon>  : <CheckIcon className='text-white'></CheckIcon>}
                      
                    </div>
                    <button className={`add-btn-product ${
                      existInCart(product.product)? "" : "left-2"
                    }`} onClick={()=>{
                    addProductToCart(product.product)
                    }}>{existInCart(product.product)? "Add to cart" : "Delete to cart" }</button>
                    <button className='delete-btn-product' onClick={()=>handleItems(product.product.id)}>Delete product</button>
                </div>
                 <img id={"imgP"+product.product.id} src={product.product.images[0].replace(`["`,"").replace(`"]`, "")} alt={product.product.description} />
                <figcaption>{product.product.category.name}</figcaption>
            </figure>
            <div className='cardProduct__aux-row'>
                <p>{product.product.title}</p>
                <strong>${product.product.price}</strong>
            </div>
        </div>
    </>
  )
}

export default ProductCard
