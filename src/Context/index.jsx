import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
    //Contador de productos en carro
    const [count, setCount] = useState(0);

    // Todos los productos traidos en home
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
        .then(res => res.json())
        .then(data => {
          setItems(data)
        })
      }, [])

    // Todos los productos traidos en clothes
    const [itemsClothes, setItemsClothes] = useState(null);

    // Todos los productos traidos en electronics
    const [itemsElectronics, setItemsElectronics] = useState(null);

    // Todos los productos traidos en furniture
    const [itemsFurniture, setItemsFurniture] = useState(null);

    // Todos los productos traidos en shoes
    const [itemsShoes, setItemsShoes] = useState(null);

    // Todos los productos traidos en shoes
    const [itemsMiscellaneous, setItemsMiscellaneous] = useState(null);

    // Boolean = aside de detalle de productos abierto o cerrado
    const [detailsOpen, setDetailsOpen] = useState(false)

    // Seteo de un solo producto para los detalles
    const [productDetails, setProductDetails] = useState({}) 

    // Carro de compra
    const [cart, setCart] = useState([]);

    //Apertura y cierre del aside del detalles de los productos
    const openAsideDetails = () => setDetailsOpen(true);
    const closeAsideDetails = () => setDetailsOpen(false);

    // Valor total de la orden en curso
    const [totalOrder, setTotalOrder] = useState(0);

    // Abrir o cerrar menu en modalidad mobile
    const [openMenuMobile, setOpenMenuMobile] = useState(false)

    // Ordenes que fueron creadas pero que no estan añadidas aun
    const [myOrder, setMyOrder] = useState([])

    //Ordenes en la seccion de My Orders - Localstorage
    const [myOrders, setMyOrders] = useState([])

    return (
    
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            items,
            setItems,
            detailsOpen,
            setDetailsOpen,
            openAsideDetails,
            closeAsideDetails,
            productDetails,
            setProductDetails,
            cart,
            setCart,
            totalOrder,
            setTotalOrder,
            openMenuMobile,
            setOpenMenuMobile,
            myOrder,
            setMyOrder,
            myOrders,
            setMyOrders,
            itemsClothes,
            setItemsClothes,
            itemsElectronics,
            setItemsElectronics,
            itemsFurniture,
            setItemsFurniture,
            itemsShoes,
            setItemsShoes,
            itemsMiscellaneous,
            setItemsMiscellaneous

        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}