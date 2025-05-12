import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/clientes/TablaClientes';
import ModalRegistroCliente from '../components/clientes/ModalRegistrarCliente';
import CuadroBusquedas from '../components/busquedas/CuadroBusqueda';
import { Container, Button, Row, Col } from "react-bootstrap";
import Paginacion from '../components/paginacion/Paginacion';

const Clientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '', segundo_nombre: '', 
    primer_apellido: '', segundo_apellido:'',
    celular:'', direccion:'', cedula:'',
  });
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:2000/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const datos = await respuesta.json();
      const datosOrdenados = datos.sort((a, b) => 
        (a.primer_nombre || '').localeCompare(b.primer_nombre || '')
      
      );
      setListaClientes(datosOrdenados);
      setClientesFiltrados(datosOrdenados);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarCliente = async () => {
    if (!nuevoCliente.primer_nombre || !nuevoCliente.segundo_nombre || 
        !nuevoCliente.primer_apellido || !nuevoCliente.segundo_apellido ||
        !nuevoCliente.celular || !nuevoCliente.direccion || !nuevoCliente.cedula) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:2000/api/registrarclientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el cliente');
      }

      await obtenerClientes();
      setNuevoCliente({ primer_nombre: '', segundo_nombre: '', 
        primer_apellido: '', segundo_apellido:'',
        celular:'', direccion:'', cedula:'', });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = listaClientes
      .filter((cliente) => {
        const primer_nombre = (cliente.primer_nombre || '').toLowerCase();
        const segundo_nombre = (cliente.segundo_nombre || '').toLowerCase();
        const primer_apellido = (cliente.primer_apellido || '').toLowerCase();
        const segundo_apellido = (cliente.segundo_apellido || '').toLowerCase();
        const celular = (cliente.celular || '').toLowerCase();
        const direccion = (cliente.direccion || '').toLowerCase();
        const cedula = (cliente.celular || '').toLowerCase();
        return (
          id.includes(texto) || 
          primer_nombre.includes(texto) || segundo_nombre.includes(texto) ||
          primer_apellido.includes(texto) || segundo_apellido.includes(texto) ||
          celular.includes(Number) || direccion.includes(String) ||
          cedula.includes(String)
        );
      })
      .sort((a, b) => (a.primer_nombre || '').localeCompare(b.primer_nombre || ''));
    setClientesFiltrados(filtrados);
    establecerPaginaActual(1);
  };

  useEffect(() => {
    if (textoBusqueda === "") {
      setClientesFiltrados([...listaClientes]);
    } else {
      const filtrados = listaClientes
      .filter((cliente) => {
        const id = (cliente.id || '').toString(); // Convertir ID a string
        const primer_nombre = (cliente.primer_nombre || '').toLowerCase();
        const segundo_nombre = (cliente.segundo_nombre || '').toLowerCase();
        const primer_apellido = (cliente.primer_apellido || '').toLowerCase();
        const segundo_apellido = (cliente.segundo_apellido || '').toLowerCase();
        const celular = (cliente.celular || '').toLowerCase();
        const direccion = (cliente.direccion || '').toLowerCase();
        const cedula = (cliente.celular || '').toLowerCase();
        return (
          id.includes(texto) || 
          primer_nombre.includes(texto) || segundo_nombre.includes(texto) ||
          primer_apellido.includes(texto) || segundo_apellido.includes(texto) ||
          celular.includes(Number) || direccion.includes(String) ||
          cedula.includes(String)
          );
        })
        .sort((a, b) => (a.primer_nombre || '').localeCompare(b.primer_nombre || ''));
      setClientesFiltrados(filtrados);
    }
  }, [listaClientes, textoBusqueda]);

        // Calcular elementos paginados
    const categoriasPaginadas = clientesFiltrados.slice(
      (paginaActual - 1) * elementosPorPagina,
      paginaActual * elementosPorPagina
    );

  return (
    <>
      <Container className="mt-5">
      <br />
      <h4>clientes</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nuevo Cliente
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <TablaClientes
        clientes={clientesFiltrados}
        cargando={cargando}
        error={errorCarga}
        totalElementos={listaClientes.length} // Total de elementos
        elementosPorPagina={elementosPorPagina} // Elementos por página
        paginaActual={paginaActual} // Página actual
        establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
      />

      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
        errorCarga={errorCarga}
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
        totalElementos={clientesFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </div>
  
    </>
    
);
};

export default Clientes;