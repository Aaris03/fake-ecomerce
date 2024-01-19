import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { createOrder } from "../../Utils"
import { XMarkIcon } from '@heroicons/react/24/solid'
import "./BuyItem.css"

const BuyItem = (item) => { 
    
    const context = useContext(ShoppingCartContext)

    const deleteProductToCart = (item) => {
        
        const array = context.cart;
        const index = array.indexOf(item);
        array.splice(index,1);

        context.setCart(array)
        context.setCount(context.count - 1)
        
        const arrayTotalPerProduct = context.cart.map((item)=>item.price);
        const total = arrayTotalPerProduct.reduce((a,b)=> a+b,0)
        context.setTotalOrder(total)
    }

    return (
        <>
            <div className={`buy-item-box`}>
                <figure>
                    <img src={item.item.images[0].replace(`["`,"").replace(`"]`, "")} alt={item.item.description} />
                </figure>
                <p>{item.item.title}</p>
                <p>{item.item.price}</p>
                <XMarkIcon className="w-6 cursor-pointer" onClick={()=>{
                    deleteProductToCart(item.item)
                    createOrder(context)
                }}/>
            </div>
        </>
    )
}

export default BuyItem;