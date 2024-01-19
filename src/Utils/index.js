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
    console.log(order)
    context.setMyOrder(order)
}