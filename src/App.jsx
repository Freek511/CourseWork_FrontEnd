
import './App.css'
import ListPlaygroundsComponent from "./components/ListPlaygroundsComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PlaygroundComponent from "./components/PlaygroundComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
             <Routes>
                 <Route path='/' element={< ListPlaygroundsComponent /> }/>
                 <Route path='/playgrounds' element={< ListPlaygroundsComponent /> }/>
                 <Route path='/add-playground' element={< PlaygroundComponent/>}/>
             </Routes>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
