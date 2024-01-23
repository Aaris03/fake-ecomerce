import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { createOrder } from "../../Utils"

const NavBar = () => {
    const context = useContext(ShoppingCartContext)

    let activeStyle = {
        textDecoration: "underline",
        textUnderlineOffset: ".5rem",
        textDecorationThickness : ".2rem"
    }

    const closeNavCategory = () => {
        if(isMobile()){
            const navCategory = document.querySelector(".nav__categories");
            navCategory.style.transform = null
            context.setOpenMenuMobile(false) 
        }    
    }

    const openNav = () => {
        if (isMobile()){
            const navCategory = document.querySelector(".nav__categories");
            if(!context.openMenuMobile){
                navCategory.style.transform = "translateX(200px)"
                context.setOpenMenuMobile(true) 
            }else{
                closeNavCategory();
            }
        }
    }

    window.addEventListener('resize', function(event) {
       closeNavCategory()
    }, true);

    const isMobile = () => {
       return window.innerWidth <= 850
    }

    const calculateTotalOrder = () => {
        const arrayTotalPerProduct = context.cart.map((item)=>item.price);
        const total = arrayTotalPerProduct.reduce((a,b)=> a+b,0)
        context.setTotalOrder(total)
    }

    const signOut = () => {
        context.setActiveSession(false)
    }

    return (
        <nav className="nav-bar-container" >
            <div className="w-full flex relative items-center">
                <div className="z-10 mr-2 " onClick={openNav}>
                    <NavLink>
                        <p className="font-bold text-xl">Shopi</p>
                    </NavLink>
                </div>
                <ul className="nav__categories" onClick={context.closeAsideDetails}>
                    <li>
                        <NavLink to="/" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""} onClick={() => closeNavCategory()}> 
                            <p >All</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/clothes" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""} onClick={() => closeNavCategory()}>
                            <p>Clothes</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/electronics" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""} onClick={() => closeNavCategory()}>
                            <p>Electronics</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/furniture" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""} onClick={() => closeNavCategory()}>
                            <p>Furniture</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shoes" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""} onClick={() => closeNavCategory()}>
                            <p>Shoes</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/miscellaneous" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""} onClick={() => closeNavCategory()}>
                            <p>Miscellaneous</p>
                        </NavLink>
                    </li>
                </ul>
                <ul className="flex w-full justify-end nav__personal" onClick={context.closeAsideDetails}>
                    <li>
                        {
                            context.activeSession ?
                            <NavLink to="/my-orders" style={({isActive}) =>
                            isActive ? activeStyle : undefined
                            } className={({isActive}) => isActive ? "font-bold" : ""}>
                                My Orders
                            </NavLink> : "" 
                        }
                    </li>
                    <li>
                        {
                            context.activeSession ?
                            <NavLink to="/my-account" style={({isActive}) =>
                            isActive ? activeStyle : undefined
                            } className={({isActive}) => isActive ? "font-bold" : ""}>
                                My Account
                            </NavLink> : ""
                        }
                    </li>
                    <li>
                        {
                            context.activeSession ?
                            <NavLink to="/add-product" style={({isActive}) =>
                            isActive ? activeStyle : undefined
                            } className={({isActive}) => isActive ? "font-bold" : ""}>
                                Add Product
                            </NavLink> : ""
                        }
                    </li>
                    <li>
                        {
                            context.activeSession ?
                            <NavLink to="/sign-in" style={({isActive}) =>
                            isActive ? activeStyle : undefined
                            } className={({isActive}) => isActive ? "font-bold" : ""} onClick={()=> signOut()}>
                                Sign out
                           </NavLink>    
                            : <NavLink to="/sign-in" style={({isActive}) =>
                             isActive ? activeStyle : undefined
                             } className={({isActive}) => isActive ? "font-bold" : ""}>
                                 Sign In
                            </NavLink>
                        }
                    </li>
                    <li onClick={()=>{
                        calculateTotalOrder()
                        createOrder(context)
                    }}>
                        <NavLink to="/my-order-cart" style={({isActive}) =>
                        isActive ? activeStyle : undefined
                        } className={({isActive}) => isActive ? "font-bold" : ""}>
                            <p>🛒 {context.count}</p>
                        </NavLink>
                        
                    </li>
                </ul>
                <div className={`invisible-box ${context.openMenuMobile? "":"hidden"}`} onClick={() => closeNavCategory()}></div>
            </div>
        </nav>
    )
}

export default NavBar