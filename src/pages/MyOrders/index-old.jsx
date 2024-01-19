import { useContext, useEffect } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import MyOrdersCard from '../../Components/MyOrdersCard';
import { ordersExist } from "../../Utils"
import './MyOrders.css';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  const getOrdersToDB = () => {

    if(ordersExist()){
      const data = localStorage.getItem("orders");
      const myOrders = JSON.parse(data);

      context.setMyOrders(myOrders)
    }else{
      context.setMyOrders([])
    }
  }

  useEffect(()=> {
    getOrdersToDB()
  },[])


  return (
    <>
      <Layout>
        <p>My Orders</p>
        <section className='my-orders-section'>
          {
            context.myOrders? context.myOrders.map(item=>{
              return <MyOrdersCard key={item.id} order={item}></MyOrdersCard>
            }) : ""
          }
        </section>
        
      </Layout>
    </>
  )
}

export default MyOrders
