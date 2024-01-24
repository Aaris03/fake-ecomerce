import { useEffect,  useContext } from 'react'
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout'
import ProductDetails from '../../Components/ProductDetails';
import ProductCard from '../../Components/ProductCard'
import { Navigate } from 'react-router-dom';
import './Shoes.css'

const Shoes = () => {

  const context = useContext(ShoppingCartContext)

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products/?categoryId=4")
    .then(res => res.json())
    .then(data => {
      context.setItemsShoes(data)
    })
  }, [])

  if(!context.activeSession){
    return <Navigate to='/sign-in' replace={true} />
  }

  return (
  <>
      <Layout>
        <p className='font-bold text-lg my-3'>Shoes</p>
        <section className='all-products-section'>
        <section className='all-products-box'>
          {
            context.itemsShoes?.map(item=>{
              return <ProductCard key={item.id} product={item}/>
            })
          }
        </section>
        <ProductDetails></ProductDetails>
      </section>
      </Layout>
  </>
  )
}

export default Shoes
