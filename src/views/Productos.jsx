import React, { useState, useEffect } from 'react';
import TablaProductos from '../components/producto/TablaProductos'; // Asumiendo que tienes este componente
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto'; // Asumiendo que tienes este componente
import { Container, Button } from "react-bootstrap";
import ModalEliminacionProducto from '../components/producto/ModalEliminacionProducto';

const Productos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Obtener categorías para el dropdown
  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categoria');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setListaCategorias(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproducto/${productoAEliminar.id_producto}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await obtenerProductos(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setProductoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setProductoAEliminar(true);
  };

  
  const abrirModalEdicion = (producto) => {
    setEditada(producto);
    setMostrarModalEdicion(true);
  };


  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.id_categoria || 
        !nuevoProducto.precio_unitario || !nuevoProducto.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      await obtenerProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Productos</h4>
      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Nuevo Producto
      </Button>
      <br/><br/>

      <TablaProductos 
        productos={listaProductos} 
        cargando={cargando} 
        error={errorCarga} 
        abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
      />

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />

<ModalEliminacionProducto
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarProducto={eliminarProducto}
        />

      
    </Container>
  );
};

export default Productos;