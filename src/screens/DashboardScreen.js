import { Layout } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Header from '../components/Dashboard/Header';
import Menu from '../components/Dashboard/Menu';
import { setIsMobile } from '../config/slice/DashboardSlice';

const DashboardScreen = () => {
  let collapsed = useSelector((state) => state.dashboard.collapsed)
  const [widthWindow, setWidth] = useState(window.innerWidth);
  let dispatch = useDispatch()
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [widthWindow]);
  let isMobile = useSelector((state) => state.dashboard.isMobile)
  const { innerWidth: width } = window;
  useEffect(() => {
    if (width < 700) {
      dispatch(setIsMobile(true))
    } else {
      dispatch(setIsMobile(false))
    }
  }, [widthWindow])

  return (
    <>
      <ToastContainer />
      <Layout className='page-layout'>
        <Menu />
        <Layout className={collapsed === false ? "site-layout" : "site-layout-inner"} style={{ marginLeft: isMobile ? "0px" : "" }}>
          <Header />
          <Outlet />
        </Layout>
      </Layout>
    </>
  )
}

export default DashboardScreen