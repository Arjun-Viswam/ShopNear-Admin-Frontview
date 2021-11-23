import React, { useEffect, useState } from "react";
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import { FaBan } from 'react-icons/fa'
import style from "./UserManager.module.css"
import axios from "axios";
import cookie from "universal-cookie";
import AppSidebar from "../Components/AppSidebar";
import { useHistory } from "react-router";
const server = "http://localhost:5550";


function UserManager() {
    const Cookies = new cookie()
    const Admin_token = Cookies.get("Admin_token")
    const [users,setusers] = useState([])
    const history = useHistory();

    useEffect(()=>{
        axios.get(`${server}/admin/user_manager`).then((res)=>{
            if(Admin_token){
                setusers(res.data)
            }else {
      history.push("/admin/login")
    }
        })
    },[]);

    function toBlock(userID){
        const data = {"userID":userID}
        axios.post(`${server}/admin/block_user`, data).then((res)=>{
            window.location.reload()
        })
    };

    function toUnblock(userID){
        const data = {"userID":userID}
        axios.post(`${server}/admin/unblock_user`, data).then((res)=>{
            window.location.reload()
        })
    }

  return (
    <div>
    <AppSidebar/>
        <div className={style.wrapper}>
        <div className={style.table}>
        <h2 className={style.title}>User Management</h2>
      <CTable color="dark" hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Manage</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {users?users.map(users=>(
          <CTableRow>
            {users.firstname?
            <CTableDataCell>{users.firstname} {users.lastname}</CTableDataCell>
              : 
              <CTableDataCell>{users.displayName}</CTableDataCell>}
            <CTableDataCell>{users.email}</CTableDataCell>
            <CTableDataCell>{users.mobile}</CTableDataCell>
            <CTableDataCell>{users.block?<span id={users._id} className={style.ban} onClick={() => toUnblock(`${users._id}`)} style={{color:"green"}} ><FaBan/></span> :<span className={style.ban} onClick={() => toBlock(`${users._id}`)} style={{color:"red"}} ><FaBan/></span>}</CTableDataCell>
          </CTableRow>
        )):null} 
        </CTableBody>
      </CTable>
      </div>
      </div>
    </div>
  );
}

export default UserManager;
