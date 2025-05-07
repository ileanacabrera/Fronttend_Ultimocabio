import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados';
import CuadroBusquedas from '../components/busquedas/CuadroBusqueda';
import ModalRegistroEmpleado from '../components/empleados/ModalRegistrarEmpleado';
import { Container, Button, Row, Col } from "react-bootstrap";
import Paginacion from '../components/paginacion/Paginacion';

const Empleados = () => {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '', segundo_nombre: '', 
    primer_apellido: '', segundo_apellido:'',
    celular:'', cargo:'', fecha_contratacion:'',
  });
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 10; // Número de elementos por página

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const datos = await respuesta.json();
      const datosOrdenados = datos.sort((a, b) => 
        (a.primer_nombre || '').localeCompare(b.primer_nombre || '')
      
      );
      setListaEmpleados(datosOrdenados);
      setEmpleadosFiltrados(datosOrdenados);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.segundo_nombre || !nuevoEmpleado.primer_apellido ||
        !nuevoEmpleado.segundo_apellido || !nuevoEmpleado.celular || !nuevoEmpleado.cargo || !nuevoEmpleado.fecha_contratacion) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarempleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el empleado');
      }

      await obtenerEmpleados();
      setNuevoEmpleado({ primer_nombre: '', segundo_nombre: '', primer_apellido:'',
        segundo_apellido:'' , celular:'' , cargo:'' , fecha_contratacion:''});
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = listaEmpleados
      .filter((Empleado) => {
        const primer_nombre = (Empleado.primer_nombre || '').toLowerCase();
        const segundo_nombre = (Empleado.segundo_nombre || '').toLowerCase();
        const primer_apellido = (Empleado.primer_apellido || '').toLowerCase();
        const segundo_apellido = (Empleado.segundo_apellido || '').toLowerCase();
        const celular = (Empleado.celular || '').toLowerCase();
        const cargo = (Empleado.cargo || '').toLowerCase();
        const fecha_contratacion = (Empleado.fecha_contratacion || '').toLowerCase();
        return (
          id.includes(texto) || 
          primer_nombre.includes(texto) || segundo_nombre.includes(texto) ||
          primer_apellido.includes(texto) || segundo_apellido.includes(texto) ||
          celular.includes(Int16Array) || cargo.includes(String) ||
          fecha_contratacion.includes(date)
        );
      })
      .sort((a, b) => (a.primer_nombre || '').localeCompare(b.primer_nombre || ''));
    setEmpleadosFiltrados(filtrados);
    establecerPaginaActual(1);
  };

  useEffect(() => {
    if (textoBusqueda === "") {
      setEmpleadosFiltrados([...listaEmpleados]);
    } else {
      const filtrados = listaEmpleados
      .filter((Empleado) => {
        const id = (Empleado.id || '').toString(); // Convertir ID a string
        const primer_nombre = (Empleado.primer_nombre || '').toLowerCase();
        const segundo_nombre = (Empleado.segundo_nombre || '').toLowerCase();
        const primer_apellido = (Empleado.primer_apellido || '').toLowerCase();
        const segundo_apellido = (Empleado.segundo_apellido || '').toLowerCase();
        const celular = (Empleado.celular || '').toLowerCase();
        const cargo = (Empleado.cargo || '').toLowerCase();
        const fecha_contratacion = (Empleado.fecha_contratacion || '').toLowerCase();
        return (
          id.includes(texto) || 
          primer_nombre.includes(texto) || segundo_nombre.includes(texto) ||
          primer_apellido.includes(texto) || segundo_apellido.includes(texto) ||
          celular.includes(Int32Array) || cargo.includes(String) ||
          fecha_contratacion.includes(date)
          );
        })
        .sort((a, b) => (a.primer_nombre || '').localeCompare(b.primer_nombre || ''));
      setEmpleadosFiltrados(filtrados);
    }
  }, [listaEmpleados, textoBusqueda]);

        // Calcular elementos paginados
    const categoriasPaginadas = empleadosFiltrados.slice(
      (paginaActual - 1) * elementosPorPagina,
      paginaActual * elementosPorPagina
    );

  return (
    <>
      <Container className="mt-5">
      <br />
      <h4>Empleado</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nuevo Empleado
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <TablaEmpleados
        empleados={empleadosFiltrados}
        cargando={cargando}
        error={errorCarga}
        totalElementos={listaEmpleados.length} // Total de elementos
        elementosPorPagina={elementosPorPagina} // Elementos por página
        paginaActual={paginaActual} // Página actual
        establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
      />

      <ModalRegistroEmpleado
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEmpleado={nuevoEmpleado}
        manejarCambioInput={manejarCambioInput}
        agregarEmpleado={agregarEmpleado}
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
        totalElementos={empleadosFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </div>
  
    </>
    
);
};

export default Empleados;