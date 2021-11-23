import React, { useEffect, useState } from "react";
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import { FaBan, icons } from 'react-icons/fa'
import style from "./ShopManagement.module.css"
import axios from "axios";
import cookie from "universal-cookie";
import AppSidebar from "../Components/AppSidebar";
import { useHistory } from "react-router";
const server = "http://localhost:5550";


function ShopManagement() {
    const Cookies = new cookie()
    const Admin_token = Cookies.get("Admin_token")
    const [shops,setShops] = useState([])
    const history = useHistory();

    useEffect(()=>{
        axios.get(`${server}/admin/shop_management`).then((res)=>{
            if(Admin_token){
                setShops(res.data)
            }else {
      history.push("/admin/login")
    }
        })
    },[]);

    function toBlock(shopID){
        const data = {"shopID":shopID}
        axios.post(`${server}/admin/block`, data).then((res)=>{
            window.location.reload()
        })
    };

    function toUnblock(shopID){
        const data = {"shopID":shopID}
        axios.post(`${server}/admin/unblock`, data).then((res)=>{
            window.location.reload()
        })
    }

  return (
    <div>
    <AppSidebar/>
        <div className={style.wrapper}>
        <div className={style.table}>
        <h2 className={style.title}>Shop Management</h2>
      <CTable color="dark" hover>
        <CTableHead>
          <CTableRow>
            {/* <CTableHeaderCell scope="col">#</CTableHeaderCell> */}
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Manage</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {shops?shops.map(shops=>(
          <CTableRow>
            {/* <CTableHeaderCell scope="row">{@index}</CTableHeaderCell> */}
            <CTableDataCell>{shops.shopname}</CTableDataCell>
            <CTableDataCell>{shops.email}</CTableDataCell>
            <CTableDataCell>{shops.mobile}</CTableDataCell>
            <CTableDataCell>{shops.block?<span id={shops._id} className={style.ban} onClick={() => toUnblock(`${shops._id}`)} style={{color:"green"}} ><FaBan/></span> :<span className={style.ban} onClick={() => toBlock(`${shops._id}`)} style={{color:"red"}} ><FaBan/></span>}</CTableDataCell>
          </CTableRow>
        )):null} 
        </CTableBody>
      </CTable>
      </div>
      </div>
    </div>
  );
}

export default ShopManagement;
