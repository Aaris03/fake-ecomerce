import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
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
  let routes = useRoutes([
    {path: "/", element: <Home/>},
    {path: "my-order-cart", element: <MyOrderCart/>},
    {path: "my-orders",element: <MyOrders/>},
    {path: "clothes",element: <Clothes/>},
    {path: "electronics",element: <Electronics/>},
    {path: "furniture",element: <Furniture/>},
    {path: "shoes",element: <Shoes/>},
    {path: "miscellaneous",element: <Miscellaneous/>},
    {path: "my-account",element: <MyAccount/>},
    {path: "sign-in",element: <SignIn/>},
    {path: "add-product",element: <AddProduct/>},
    {path: "*",element: <NotFound/>},
  ])

  return routes
}

function App() {

  return (
    <>
      <ShoppingCartProvider>
        <BrowserRouter>
          <NavBar/>
          <AppRoutes/>
        </BrowserRouter>
      </ShoppingCartProvider>
      
    </>
  )
}

export default App
