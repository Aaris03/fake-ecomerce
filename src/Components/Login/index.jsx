import { ShoppingCartContext } from "../../Context";
import { useContext } from 'react'
import { handleGetUsers } from "../../Utils"
import { useForm } from 'react-hook-form'
import './Login.css'
import { useNavigate } from "react-router-dom";

const Login = ({change}) => {

    const context = useContext(ShoppingCartContext)

    const { register, handleSubmit} = useForm()
    
    const navigate = useNavigate();

    const handleEmailExist = (users, email) => {
        const found = users.find((item)=> item.email === email)
        return found
    }

    const handlePasswordsMatch = (user, password) => {
        if(user.password === password){
            context.setActiveSession(true)
            navigate('/')
        }else{
            console.log("las contraseñas no coinciden")
        }
    }

    const login = handleSubmit((data)=>{
        const users = handleGetUsers();

        const userLogin = {
            email: data.email,
            password: data.password
        }
        if(handleEmailExist(users, userLogin.email)!= undefined){
            const user = handleEmailExist(users, userLogin.email);
            handlePasswordsMatch(user, userLogin.password)
        }else{
            console.log("no existe")
        }
    })

    return (
        <section className="flex flex-col login-section">
            <form onSubmit={login}>
                <div className='mb-2'>
                    <label htmlFor="userEmail">Email:</label>
                    <input disabled={context.activeSession?true:false} className='ml-2 px-2' type="email" id="userEmail" name="userEmail" placeholder='Email...' {...register('email',{
                       required: {
                        value:true
                       } 
                    })}/>
                </div>
                <div>
                    <label htmlFor="userPassword">Password:</label>
                    <input disabled={context.activeSession?true:false} className='ml-2 px-2' type="password" id="userPassword" name="userPassword" placeholder='Password...'  {...register('password', {
                       required: {
                        value:true
                       } 
                    })}/>
                </div>
                <div className='my-5'>
                    <button className='login-btn' disabled={context.activeSession}>
                        <p>Log in</p>
                    </button>
                </div>
            </form>
            <div className='flex justify-center'>
                <a href="" className='underline'>Forgot my password</a>
            </div>
            <div className='my-5'>
                <button className={`sign-up-btn`}  onClick={()=>change()}>
                    <p>Sign up</p>
                </button>
            </div>
        </section>
    )
}

export default Login