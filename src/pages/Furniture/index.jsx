import { useEffect,  useContext } from 'react'
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout'
import ProductDetails from '../../Components/ProductDetails';
import ProductCard from '../../Components/ProductCard'
import './Furniture.css'

const Furniture = () => {

  const context = useContext(ShoppingCartContext)

  useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/products/?categoryId=3")
      .then(res => res.json())
      .then(data => {
        context.setItemsFurniture(data)
      })
    }, [])

  return (
  <>
      <Layout>
        <p className='font-bold text-lg my-3'>Furniture</p>
        <section className='all-products-section'>
        <section className='all-products-box'>
          {
            context.itemsFurniture?.map(item=>{
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

export default Furniture
