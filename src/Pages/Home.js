import React, { useEffect, useState } from "react";
import AppSidebar from '../Components/AppSidebar'
import cookie from "universal-cookie";
import { useHistory } from "react-router";

function Home() {
    const Cookies = new cookie();
  const history = useHistory();
  useEffect(() => {
    const Admin_token = Cookies.get("Admin_token");
    if (Admin_token) {
      history.push("/admin");
    }else {
      history.push("/admin/login")
    }
  },[]);
    return (
        <div>
            <AppSidebar/>
        </div>
    )
}

export default Home
