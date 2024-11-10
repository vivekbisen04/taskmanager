import React from 'react'

const Navbar = ({onLogout}) => {
  return (
    <div className='bg-white shadow h-14'>
        <button onClick={onLogout} className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
    </div>
    
  )
}

export default Navbar