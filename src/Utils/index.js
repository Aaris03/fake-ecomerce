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