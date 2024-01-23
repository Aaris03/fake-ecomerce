import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import { ShoppingCartContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import MyOrderCart from '../MyOrderCart'
import NavBar from '../../Components/NavBar'
import AddProduct from '../AddProduct'
import Clothes from "../Clothes"
import Electronics from "../Electronics"
import Furniture from "../Furniture"
import Shoes from "../Shoes"
import Miscellaneous from "../Miscellaneous"
import './App.css'

const AppRoutes = () => {
  const navigate = useNavigate();

  const context = useContext(ShoppingCartContext)
  
  let routes = useRoutes([
    {path: "/", element: context.activeSession ? <Home/> : <SignIn/>},
    {path: "my-order-cart", element: context.activeSession ? <MyOrderCart/> : <SignIn/>},
    {path: "my-orders",element: context.activeSession ? <MyOrders/> : <SignIn/>},
    {path: "clothes",element:context.activeSession ? <Clothes/> : <SignIn/>},
    {path: "electronics",element:context.activeSession ? <Electronics/> : <SignIn/>},
    {path: "furniture",element:context.activeSession ? <Furniture/> : <SignIn/>},
    {path: "shoes",element:context.activeSession ? <Shoes/> : <SignIn/>},
    {path: "miscellaneous",element:context.activeSession ? <Miscellaneous/> : <SignIn/>},
    {path: "my-account",element:context.activeSession ? <MyAccount/> : <SignIn/>},
    {path: "sign-in",element: <SignIn/>},
    {path: "add-product",element:context.activeSession ? <AddProduct/> : <SignIn/>},
    {path: "*",element: <NotFound/>},
  ])

  return routes
}

function App() {

  return (
      <ShoppingCartProvider>
        <BrowserRouter>
          <NavBar/>
          <AppRoutes/>
        </BrowserRouter>
      </ShoppingCartProvider>
  )
}

export default App
