import { Children } from 'react';

function Layout({ children }) {
  return (
    <>
        <main className='main-container'>
            {children}
        </main>
    </>
  )
}

export default Layout
