import { useContext, useEffect } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import MyOrdersCard from '../../Components/MyOrdersCard';
import { ordersExist } from "../../Utils"
import './MyOrders.css';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  const getOrdersToDB = () => {
    const data = localStorage.getItem("orders");
    const myOrders = JSON.parse(data);

    // Si no existe localStorage.getItem("orders") cuando parsees es null y la siguiente
    // linea el evalua si el primer dato es null te damos entonces un array vacio
    context.setMyOrders(myOrders || []);

    // Podrias evaluar que localStorage.getItem("orders") sea un array y no otro tipo de dato
    // para saber q algo es un array preguntas si tiene la propiedad .length
    // ordersExist esto es innecesario
  }

  useEffect(()=> {
    getOrdersToDB()
  },[]);


  // Puedes devolver un layout sin necesidad del fragment
  // Las etiquetas pueden ser autocerradas si no tienen hijos adentro <MyOrdersCard />
  
  return (
    <Layout>
      <p>My Orders</p>
      <section className='my-orders-section'>
        {
          context.myOrders && context.myOrders.map(item=>{
            return <MyOrdersCard key={item.id} order={item} />
          })
        }

        {/* Puedes usar cualquiera de las 2 formas la de arriba o la de abajo,
        pero no puedes hacer condicion ? component : "" */}

        {/* {
          context.myOrders?.map(item=>{
            return <MyOrdersCard key={item.id} order={item} />
          })
        } */}
      </section>
    </Layout>
  );
};

export default MyOrders;
