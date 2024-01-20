export const ordersExist = () => {
    if(localStorage.getItem("orders") === null){
        return false;
    }else{
        return true;
    }
}

export const dateFormat = () => {
    let datePrimary = new Date()

    let day = datePrimary.getDate();
    let month = datePrimary.getMonth() + 1;
    let year = datePrimary.getFullYear();

    return `${day}/${month}/${year}`
}

export const createOrder = (context) => {
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

export const existInCart = (product, cart) => { 
    const addCart = cart//context.cart

    const validate = addCart?.find((item)=>item.id === product.id)
    return validate === undefined
}

export const addProductToCart = (product, contextCart, context) => {
    let addCart = contextCart //context.cart

    if(existInCart(product, contextCart)){
      addCart.push(product)
      context.setCart(addCart)
      context.setCount(context.count + 1)
    }else{  
      const array = contextCart;
      const index = array.indexOf(product);
      array.splice(index,1);

      context.setCart(array)
      context.setCount(context.count - 1)
    }
}