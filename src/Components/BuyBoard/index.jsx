import { Link } from "react-router-dom"
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import "./BuyBoard.css"
import BuyItem from "../BuyItem";
import { ordersExist } from "../../Utils"

const BuyBoard = () => {
    const context = useContext(ShoppingCartContext)

    const addOrderToOrders = () => {

        if(ordersExist()){
            const data = localStorage.getItem("orders");
            let myOrders = JSON.parse(data);

            myOrders.unshift(context.myOrder);

            const parseOrder = JSON.stringify(myOrders)

            localStorage.setItem("orders", parseOrder);
        }else{   
            const parseOrder = JSON.stringify([context.myOrder])

            localStorage.setItem("orders", parseOrder);
        }

        context.setCart([]);
        context.setCount(0);
        context.setTotalOrder(0);
    }

    return (
        <section className="buy-order-section">
            <div className="buy-order-items-box">
                {   context.cart.length === 0 ? <p>No tienes productos en el carro</p> :
                    context.cart?.map((item)=>{
                        return <BuyItem key={item.id} item={item}></BuyItem>
                    })
                }
            </div>
            <div className="agree-box">
                <div className="total-order-box">
                    <div className="flex w-full font-bold">
                        <p>Purchase summary</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <p>Products amount</p>
                        <p>{context.cart.length}</p>
                    </div>
                    <div className="flex w-full font-bold justify-between">
                        <p>Total</p>
                        <p>${context.totalOrder}</p>
                    </div>
                </div>
                <Link to={"/my-orders"}>
                    <button disabled={
                        context.cart.length === 0 ? "disabled" : ""
                        } onClick={()=>addOrderToOrders()}>
                        Buy
                    </button>    
                </Link>
            </div>
        </section>
    )
}

export default BuyBoard;