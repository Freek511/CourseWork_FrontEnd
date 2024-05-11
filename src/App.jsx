
import './App.css'
import ListPlaygroundsComponent from "./components/ListPlaygroundsComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PlaygroundComponent from "./components/PlaygroundComponent.jsx";
import AuthComponent from "./components/AuthComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
             <Routes>
                 <Route path='/' element={< ListPlaygroundsComponent /> }/>
                 <Route path='/playgrounds' element={< ListPlaygroundsComponent /> }/>
                 <Route path='/add-playground' element={< PlaygroundComponent/>}/>
                 <Route path='/edit-playground/:id'  element={< PlaygroundComponent/>}/>
                 <Route path='/register' element={< AuthComponent/>}/>
             </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
