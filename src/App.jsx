
import './App.css'
import ListPlaygroundsComponent from "./components/ListPlaygroundsComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PlaygroundComponent from "./components/PlaygroundComponent.jsx";
import RegistrationComponent from "./components/RegistrationComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

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
                 </Route>
                 <Route path='/register' element={< RegistrationComponent/>}/>
                 <Route path='/login' element={< LoginComponent/>}/>
             </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
