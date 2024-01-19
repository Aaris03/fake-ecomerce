import Layout from '../../Components/Layout'
import AddProductForm from '../../Components/AddProductForm'
import './AddProduct.css'

function AddProduct() {

  return (
    <>
      <Layout>
        <section className='add-product-form-section'>
          <AddProductForm/>
        </section>
      </Layout>
    </>
  )
}

export default AddProduct
