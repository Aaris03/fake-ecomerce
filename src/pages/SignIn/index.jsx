import { useEffect, useState } from 'react';
import Layout from '../../Components/Layout'
import Login from '../../Components/Login'
import CreateUser from '../../Components/CreateUser'
import './SignIn.css'

function SignIn() {

  useEffect(()=>{
    setCreateUserView(false)
  },[])

  const [createUserView, setCreateUserView] = useState(false);

  const createUserViewActive = () => {
      setCreateUserView(true)
  }
  const createUserViewOff = () => {
    setCreateUserView(false)
}

  return (
    <Layout>
      <p className='font-bold'>Welcome</p>
      <section className='sign-in-section'>
        {
          !createUserView ? <Login change={createUserViewActive}/> : <CreateUser change={createUserViewOff}/>

        }
      </section>
      
    </Layout>
  )
}

export default SignIn