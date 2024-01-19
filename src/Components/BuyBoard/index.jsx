import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import "./BuyBoard.css"
import BuyItem from "../BuyItem";
import { ordersExist } from "../../Utils"
import { dateFormat } from "../../Utils"

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

        window.location.pathname = "/my-orders";
    }

    const createOrder = () => {
        let id = 0;
        if(ordersExist()){
            const data = localStorage.getItem("orders");
            let myOrders = JSON.parse(data);
            id = myOrders[0].id+1
        }

        const order = {
            id: id,
            orderItem: context.cart,
            total: context.totalOrder,
            createdAt: dateFormat()
        }
        context.setMyOrder(order)
    }

    return (
        <>
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
                    
                    <button disabled={
                        context.cart.length === 0 ? "disabled" : ""
                    } onMouseEnter={()=>createOrder()} onClick={()=>addOrderToOrders()}>
                        Buy
                    </button>
                </div>
            </section>
        </>
    )
}

export default BuyBoard;