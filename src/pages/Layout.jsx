import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "./global/Topbar";
import AppSidebar from "./global/AppSidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import BackDropModal from "./global/BackDropModal";

const Layout = () => {

  const dispatch = useDispatch();
  //Reducers
  const { isLoggedIn,  userDetails} = useSelector((state) => state.profileReducer);
  const { isBackdropActive } = useSelector((state) => state.backdropReducer);
  
  //if the current time is greater than the expiration time(set during login), dispatching session expired action
  if(Date.now() >= userDetails.eat){
    dispatch({ type: 'SESSION_EXPIRED'});
    localStorage.clear();
    return <Navigate to="/Login" replace />;
  }
  //If not logged in, clear the local storage and redirect to login page - checks with isLoggedIn profile reducer
  if (!isLoggedIn) {
    localStorage.clear();
    return <Navigate to="/Login" replace />;
  }

  return (
    <Box>
      <ProSidebarProvider>
        <div className="app">
          <AppSidebar />
          <div className="contents">
            <Topbar />
            <main class="mainclass">
              <Outlet />
            </main>
          </div>
        </div>
      </ProSidebarProvider>
      {isBackdropActive && <BackDropModal />}
    </Box>
  );
};

export default Layout;

//   const healthCheck = async () => {
//     let response = await backendInstance.get(`/auth/health`);
//     console.log(response.data);
//   };

  