import { useContext } from "react";
import "./ProductDetails.css"
import { ShoppingCartContext } from "../../Context";
import { addProductToCart } from "../../Utils"
import { existInCart } from "../../Utils"
import { XMarkIcon } from '@heroicons/react/24/solid'

const ProductDetails = () => {

    const context = useContext(ShoppingCartContext)

    return(
        <>
            <aside className={`product-details-section ${!context.detailsOpen ? "hide": ""}`}>
                <div className="flex justify-between w-full my-5 px-5">
                    <p className="font-bold text-lg">Details</p>
                    <XMarkIcon className="w-6 cursor-pointer" onClick={context.closeAsideDetails}/>
                </div>
                <div className="aux-row px-5">
                    <figure className="h-72">
                        <img src={Object.keys(context.productDetails).length !== 0? context.productDetails.images[0].replace(`["`,"").replace(`"]`, "") : ""} alt={context.productDetails.title} className="w-full h-full object-cover"/>
                    </figure>
                    <div className="details-products-text-box">
                        <div>
                            <p className="font-bold text-xl my-4">${context.productDetails.price}</p>
                            <p className="my-4">{context.productDetails.title}</p>
                        </div>
                        <div>
                            <p className="my-4 text-justify">{context.productDetails.description}</p>
                        </div>
                    </div>
                </div>
                <button className={`btn-TD-cart ${
                    existInCart(context.productDetails, context.cart)? "add-producto-TD-cart" : "remove-producto-TD-cart"
                    }`} onClick={()=>addProductToCart(context.productDetails,context.cart,context)}> 
                        {existInCart(context.productDetails,  context.cart)? "Add to cart" : "Delete to cart" }
                </button>
            </aside>
        </>
    )
}

export default ProductDetails;
