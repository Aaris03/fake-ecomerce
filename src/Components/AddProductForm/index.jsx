import { useForm } from 'react-hook-form'
import './AddProductForm.css'

function AddProductForm(){
    const { register, handleSubmit, formState:{errors}, reset } = useForm()

    const sendProduct =  handleSubmit((data)=>{
      const product = {
        title: data.title,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
        images: [data.images]
      }
      console.log(product)
  
      fetch("https://api.escuelajs.co/api/v1/products/",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
        })
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
        }).then(update => {
            alert("Se creo el producto!!!");
            reset();
        }).catch(e => {
            console.log(e);
            alert("El producto no se pudo crear");
        });
    })

    return (
        <>
            <h3 className='font-bold text-xl mb-4'>Añadir un nuevo producto</h3>
            <form onSubmit={sendProduct} className='add-product-form-container'>
                <label htmlFor="name" >Name</label>
                <input type="text" {...register("title",{
                    required: {
                        value: true,
                        message: "El nombre del producto es requerido"
                    },
                    minLength: {
                        value: 3,
                        message: "El nombre no puede tener menos de 3 caracteres"
                    },
                    maxLength: {
                        value: 30,
                        message: "El nombre no puede tener mas de 30 caracteres"
                    }
                })}/>
                {
                    errors.title && <span>{errors.title.message}</span>
                }

                <label htmlFor="price">Price</label>
                <input type="number" {...register("price",{
                    required: {
                        value: true,
                        message: "El precio del producto es requerido"
                    },
                    min: {
                        value: 0,
                        message: "El precio no puede ser negativo"
                    }
                })}/>

                {
                    errors.price && <span>{errors.price.message}</span>
                }

                <label htmlFor="description">Description</label>
                <input type="text" {...register("description",{
                    required: {
                        value: true,
                        message: "La descripcion del producto es requerido"
                    },
                    minLength: {
                        value: 8,
                        message: "La descripcion no puede tener menos de 8 caracteres"
                    },
                    maxLength: {
                        value: 1000,
                        message: "La descripcion no puede tener mas de 1000 caracteres"
                    }
                })}/>
                {
                    errors.description && <span>{errors.description.message}</span>
                }

                <label htmlFor="category">Category</label>
                <select name="category" {...register("categoryId",{
                    required: {
                        value: true,
                        message: "La categoria del producto es requerido"
                    }
                })}>
                    <option value=""></option>
                    <option value="1">Clothes</option>
                    <option value="2">Electronics</option>
                    <option value="3">Furniture</option>
                    <option value="4">Shoes</option>
                    <option value="5">Miscellaneous</option>
                </select>
                {
                    errors.categoryId && <span>{errors.categoryId.message}</span>
                }

                <label htmlFor="img">Image</label>
                <input type="tetx" {...register("images",{
                    required: {
                        value: true,
                        message: "La imagen del producto es requerido"
                    },
                    /*pattern: /.*(png|jpg|jpeg|gif)$/,
                    message: "La url de la imagen no es valida"*/
                    validate: (value) => {
                        if (value.includes(".gif") && value.includes("http")) {
                            return true
                        } else if (value.includes(".png") && value.includes("http")){
                            return true
                        } else if (value.includes(".jpg") && value.includes("http")){
                            return true
                        } else if (value.includes(".jpeg") && value.includes("http")){
                            return true
                        } else {
                            console.log("La url de la imagen no es valida 2")
                            return false
                        }
                    }
                })}/>
                {
                    errors.images && <span>{errors.images.message?errors.images.message: "La url de la imagen no es valida"}</span>
                }
                <button>Agregar</button>
            </form>
        </>
    )
}

export default AddProductForm