import {React, useState, useEffect} from 'react'
import style from './AppSidebar.module.css'
import { FaBars, icons } from 'react-icons/fa'
import Cookies from "universal-cookie";

function AppSidebar() {
    let Cookie = new Cookies()
    const [User, setUser ] = useState(false)
  
    let shopname = localStorage.getItem('shopname')
    useEffect(()=>{
      if(Cookie.get("Admin_token")){
        setUser(shopname)
      }
    })

    const Logout = ()=>{
      Cookie.remove("Admin_token")
      localStorage.clear()
      window.location.href = "/admin/login"
    }
  
  const[toggle,setToggle]=useState(true)

  function OpenToggle(e){
    toggle?setToggle(false):setToggle(true)
  }
  return (
    <div>
      <div className={toggle?style.toggled:null} id={style.wrapper}>

<div  id={style.sidebar_wrapper}>
    <ul className={style.sidebar_nav}>
        <li className={style.sidebar_brand}>
            <h3 style={{marginTop:"13px"}}><a href="#">ShopNear</a> </h3>  
        </li>
        <li>
            <a href="#">Dashboard</a>
        </li>
        <li>
            <a href="#">User Management</a>
        </li>
        <li>
            <a href="#">Shop Management</a>
        </li>
        <li>
            <a href="#">Report</a>
        </li>
        <li>
            <a href="#">Payment Management</a>
        </li>
    </ul>
</div>
<div  id={style.page_content_wrapper}>
    <div className={style.container_fluid}>
    <div className={style.topnav}>
        <div>
        <span onClick={OpenToggle} ><FaBars/></span>
        </div>
        <span className={style.noHover} onClick={Logout} style={{ marginRight: "30px"}} >Logout</span>
      </div>
    </div>  
</div>
</div>
    </div>
  )
}

export default AppSidebar
