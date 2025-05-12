import React, { useState, useEffect } from 'react';
import TablaCategorias from '../components/categorias/TablaCategorias';
import ModalRegistroCategoria from '../components/categorias/ModalRegistrarCategoria';
import CuadroBusquedas from '../components/busquedas/CuadroBusqueda';
import { Container, Button, Row, Col } from "react-bootstrap";
import Paginacion from '../components/paginacion/Paginacion';
import ModalEliminacionCategoria from '../components/categorias/ModalEliminacionCategoria';

import ModalEdicionCategoria from '../components/categorias/ModalActualizacionCategoria';

const Categorias = () => {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '', descripcion_categoria: ''});
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:2000/api/categorias');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      const datosOrdenados = datos.sort((a, b) => 
        (a.nombre_categoria || '').localeCompare(b.nombre_categoria || '')
      );
      setListaCategorias(datosOrdenados);
      setCategoriasFiltradas(datosOrdenados);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarCategoria = async () => {
    if (!nuevaCategoria.nombre_categoria || !nuevaCategoria.descripcion_categoria) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:2000/api/registrarcategoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCategoria),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar la categoría');
      }

      await obtenerCategorias();
      setNuevaCategoria({ nombre_categoria: '', descripcion_categoria: '' });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarCategoria = async () => {
    if (!categoriaAEliminar) return;
  
    try {
      const respuesta = await fetch(`http://localhost:2000/api/eliminarcategoria/${categoriaAEliminar.id_categoria}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar la venta');
      }
      
      setMostrarModalEliminacion(false);
      await obtenerCategorias();
      setCategoriaAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };
  
  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminacion(true);
  };
  
  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarCategoria = async () => {
    if (!categoriaEditada?.nombre_categoria || !categoriaEditada?.descripcion_categoria) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:2000/api/actualizarcategoria/${categoriaEditada.id_categoria}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_categoria: categoriaEditada.nombre_categoria,
          descripcion_categoria: categoriaEditada.descripcion_categoria,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      await obtenerCategorias();
      setMostrarModalEdicion(false);
      setCategoriaEditada(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (categoria) => {
    setCategoriaEditada(categoria);
    setMostrarModalEdicion(true);
  };


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
  
    const filtradas = listaCategorias
      .filter((categoria) => {
        const id = (categoria.id || '').toString(); // Convertir ID a string
        const nombre = (categoria.nombre_categoria || '').toLowerCase();
        const descripcion = (categoria.descripcion_categoria || '').toLowerCase();
        return (
          id.includes(texto) || 
          nombre.includes(texto) || 
          descripcion.includes(texto)
        );
      })
      .sort((a, b) => (a.nombre_categoria || '').localeCompare(b.nombre_categoria || ''));
    setCategoriasFiltradas(filtradas);
    establecerPaginaActual(1);
  };

  useEffect(() => {
    if (textoBusqueda === "") {
      setCategoriasFiltradas([...listaCategorias]);
    } else {
      const filtradas = listaCategorias
        .filter((categoria) => {
          const id = (categoria.id || '').toString(); // Convertir ID a string
          const nombre = (categoria.nombre_categoria || '').toLowerCase();
          const descripcion = (categoria.descripcion_categoria || '').toLowerCase();
          return (
            id.includes(textoBusqueda) || 
            nombre.includes(textoBusqueda) || 
            descripcion.includes(textoBusqueda)
          );
        })
        .sort((a, b) => (a.nombre_categoria || '').localeCompare(b.nombre_categoria || ''));
      setCategoriasFiltradas(filtradas);
    }
  }, [listaCategorias, textoBusqueda]);

        // Calcular elementos paginados
    const categoriasPaginadas = categoriasFiltradas.slice(
      (paginaActual - 1) * elementosPorPagina,
      paginaActual * elementosPorPagina
    );

  return (
    <>
      <Container className="mt-5">
      <br />
      <h4>Categorías</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nueva Categoría
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda} />
        </Col>
      </Row>

      <TablaCategorias 
          categorias={categoriasPaginadas} 
          cargando={cargando} 
          error={errorCarga}
          totalElementos={listaCategorias.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />


      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejarCambioInput={manejarCambioInput}
        agregarCategoria={agregarCategoria}
        errorCarga={errorCarga}
      />

      <ModalEdicionCategoria
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          categoriaEditada={categoriaEditada}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarCategoria={actualizarCategoria}
          errorCarga={errorCarga}
        />

        <ModalEliminacionCategoria
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarCategoria={eliminarCategoria}
        />

    </Container>

     {/* Paginación fija al fondo */}
     <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "white",
      padding: "10px 0",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      zIndex: 1000,
      textAlign: "center"
    }}>
      <Paginacion
        totalElementos={categoriasFiltradas.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
        
      />
    </div>
  
    </>
    
);
};

export default Categorias;