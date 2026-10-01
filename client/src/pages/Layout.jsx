import React from 'react'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
    <div>Layout</div>
    <div><Outlet/></div>
    </>
  )
}

export default Layout