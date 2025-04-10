import Sidebar from "./components/Sidebar/Sidebar"
import Menubar from "./components/Menubar/Menubar"
import ListFood from "./Pages/ListFoods/ListFood"
import OrderFood from "./Pages/OrderFood/OrderFood"
import AddFood from "./Pages/AddFood/AddFood"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";



function App() {

  const [sidebarVisible , toggleSidebar] = useState(true);

  function toggle() {
    toggleSidebar( !sidebarVisible);
  }

  return (
    <div className="d-flex" id="wrapper">
      
        <Sidebar sidebar={sidebarVisible}></Sidebar>
      

      <div id="page-content-wrapper">
        
          <Menubar sidebarToggle={toggle}></Menubar>
        

        <div className="container-fluid">
          <ToastContainer />
          <Routes>
            <Route
              path="/list-foods"
              element={
                
                  <ListFood />
                
              }
            ></Route>
            <Route
              path="/order-food"
              element={
                
                  <OrderFood />
                
              }
            ></Route>
            <Route
              path="/add-food"
              element={
                
                  <AddFood />
                
              }
            ></Route>
            <Route
              path="/"
              element={
                
                  <ListFood />
                
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
