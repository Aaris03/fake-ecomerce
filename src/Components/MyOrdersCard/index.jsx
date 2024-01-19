import "./MyOrdersCard.css"

const MyOrdersCard = (order) => {
    return(
        <>
            <div className='order-card-container'>
                <div className='flex w-full justify-between'>
                    <p>{order.order.createdAt}</p>
                    <p>N° {order.order.id +1}</p>
                </div>
                <div>
                    <p className='font-bold'>Total price {order.order.total}</p>
                </div>  
                {
                    order.order.orderItem.map( (item, index) => {
                        
                        return(
                            <div className='flex items-center  justify-between' key={index}>
                                <img src={`${item.images[0].replace(`["`,"").replace(`"]`, "")}`} alt={`${item.title}`}/>
                                <p>{item.title}</p>
                            </div>
                        )
                        
                    })
                }
            </div>
            
        </>
    )
}

export default MyOrdersCard