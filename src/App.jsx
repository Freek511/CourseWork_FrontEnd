
import './App.css'
import ListPlaygroundsComponent from "./components/ListPlaygroundsComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PlaygroundComponent from "./components/PlaygroundComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import OrderComponent from "./components/OrderComponent.jsx";
import ListOrdersComponent from "./components/ListOrdersComponent.jsx";
import RegistrationComponent from "./components/RegistrationComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
             <Routes>
                 <Route element={<AuthOutlet fallbackPath='/login'/>}>
                    <Route path='/' element={< ListPlaygroundsComponent /> }/>
                    <Route path='/playgrounds' element={< ListPlaygroundsComponent /> }/>
                    <Route path='/add-playground' element={< PlaygroundComponent/>}/>
                    <Route path='/edit-playground/:id'  element={< PlaygroundComponent/>}/>
                    <Route path='/playgrounds/:id'  element={< OrderComponent/>}/>
                    <Route path='/orders' element={< ListOrdersComponent/>}/>
                    <Route path='/edit-order/:order_id'  element={< OrderComponent/>}/>
                 </Route>
                 <Route path='/register' element={< RegistrationComponent/>}/>
                 <Route path='/login' element={< LoginComponent/>}/>
             </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
