import { useContext, useState, useEffect } from 'react'
import Layout from '../../Components/Layout'
import ProductCard from '../../Components/ProductCard' 
import { ShoppingCartContext } from '../../Context';
import './Home.css'
import ProductDetails from '../../Components/ProductDetails';

function Home() {

  const context = useContext(ShoppingCartContext)

  const [inputEmpty , setInputEmpty] = useState(true)

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => res.json())
    .then(data => {
        context.setItems(data)
    })
  }, [])

  const baseArray = context.items;
  
  const handleFilterItems = (e, baseArray) => {
    
    const filterParams = e.target.value;

    setInputEmpty(()=>{
      if(filterParams.length > 0){
        return false
      }else{
        return true
      }
    })
    
    const searching = baseArray?.filter((item)=>{
      const searchLowerTitle = item.title.toLowerCase();
      const searchLowerCategory = item.category.name.toLowerCase();

      if(searchLowerTitle.includes(filterParams.toLowerCase()) ||searchLowerCategory.includes(filterParams.toLowerCase())){
        return item
      }
    })
    context.setFilterItems(searching)
  }

  return (
      <Layout>
          <p className='font-bold text-lg my-3'>Exclusive products</p> 
          <input type="text" className='search-products-home-input' onChange={(e)=>handleFilterItems(e, baseArray)} placeholder='Search products'/>
        <section className='all-products-section'>
          <section className='all-products-box'>
            {
              !inputEmpty ? 
                context.filterItems.length > 0 ?
                  context.filterItems?.map(item=>{
                    return <ProductCard key={item.id} product={item}/>
                  }): <p>No existen coincidencias de busqueda</p> 
                  : context.items?.map(item=>{
                  return <ProductCard key={item.id} product={item}/>
                })
            }
          </section>
          <ProductDetails></ProductDetails>
        </section>
      </Layout>
  )
}

export default Home
