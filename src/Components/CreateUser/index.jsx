import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { handleGetUsers } from "../../Utils"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

import './CreateUser.css'


const CreateUser = ({change}) => {

    const { register, handleSubmit, reset } = useForm()

    const [errorMessage, setErrorMessage] = useState(null)
    const [error, setError] = useState(false)

    const [successMessage, setSuccessMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
        handleInitUsers()
    },[])

    const handleInitUsers = () => {

        const users = localStorage.getItem('users')

        if(users === null){
            localStorage.setItem('users','[]')
        }
    }

    const handleVerifyUser = (email) => {
        const users = handleGetUsers();

        const emails = users.map((item)=>item.email)

        const exist = emails.includes(email)

        return exist
    }

    const addUser = handleSubmit((data) => {
        const user = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        const users = handleGetUsers();

        users.push(user)

        if(!handleVerifyUser(user.email)){
            const parseUser = JSON.stringify(users)

            localStorage.setItem('users', parseUser)

            setSuccess(true)
            setSuccessMessage("El Usuario fue creado")

            reset()
        }else{
            setError(true)
            setErrorMessage("El correo ya fue utilizado para crear un usuario")
        }
    })

    const handleCloseBubble = () => {
        setError(false)
        setSuccess(false)
    }

    return (
        <section className='create-user-section'>
            <div className='flex w-full justify-end cursor-pointer' onClick={()=>change()}>
                <p className='mr-2 font-bold'>Back</p>
                <ArrowUturnLeftIcon className='w-5'/>
            </div>
            {
                error ? 
                <div className='bubble error'>
                    <p className='mr-2'>{errorMessage}</p>
                    <span onClick={()=>handleCloseBubble()}><XMarkIcon className='w-5'/></span>
                </div> :
                ""
            }
            {
                success ? 
                <div className='bubble success'>
                    <p className='mr-2'>{successMessage}</p>
                    <span onClick={()=>handleCloseBubble()}><XMarkIcon className='w-5'/></span>
                </div> :
                ""
            }
            <form action='' onSubmit={addUser} >
                <div className='flex flex-col mb-3'>
                    <label htmlFor='name'>Your name:</label>
                    <input type='text' placeholder='Name...' {...register('name',{
                        required: {
                            value:true
                        }
                    })} />    
                </div>
                <div className='flex flex-col mb-3'>
                    <label htmlFor='email'>Your email:</label>
                    <input type='email' placeholder='Email...' {...register('email',{
                        required: {
                            value:true
                        }
                    })}/>    
                </div>
                <div className='flex flex-col mb-3'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='Password...' {...register('password',{
                        required: {
                            value:true
                        }
                    })}/>    
                </div>
                <div>
                    <button className='create-btn'>
                        <p>Create</p>
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreateUser