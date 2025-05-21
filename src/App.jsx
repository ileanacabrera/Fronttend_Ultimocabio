
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Clientes from "./views/clientes";
import './App.css';
import Categorias from "./views/categorias"
import Encabezado from "./components/encabezado/Encabezado";
import Producto from "./views/productos";
import Ventas from "./views/ventas";
import Compras from "./views/Compras";
import Dashboard from "./views/Dashboard";

import Estadisticas from "./views/Estadisticas";

import Catalogo from "./views/CatalogoProductos"
import Empleados from "./views/Empleados";


const App = () => {
  return (
      <Router>
        //Contenedor principal con margen superior
      <main className="margen-superior-main">
      <Encabezado/>    
        <Routes>
         //Definicion de rutas
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<Clientes/>} />
          <Route path="/productos" element={<Producto/>} />
          <Route path="/categorias" element={<Categorias />} />
           <Route path="/Compras" element={<Compras />} />
           <Route path="/Estadisticas"element={<Estadisticas/>}/>
            <Route path="/Empleados" element={<Empleados />} />
             <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ventas" element={<Ventas />} />
           <Route path="/CatalogoProductos" element={<Catalogo />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;