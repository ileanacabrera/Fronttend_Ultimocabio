import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import VentasPorAnio from '../components/graficos/VentasPorAño';

import VentasPorDia from '../components/graficos/VentasPorDia';

const Estadisticas = () => {
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  const [anios, setAnios] = useState([]);
  const [totalesPorAnio, setTotalesPorAnio] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [totalesPorEmpleado, setTotalesPorEmpleado] = useState([]);

  const [dias, setDias] = useState([]); // 👈 NUEVO STATE
  const [totalesPorDia, setTotalesPorDia] = useState([]); // 👈 NUEVO STATE

  useEffect(() => {
    const cargaVentasMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorMes');
        const data = await response.json();
        setMeses(data.map(item => item.mes));
        setTotalesPorMes(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas por mes:', error);
      }
    };

    const cargaVentasAnio = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorAnio');
        const data = await response.json();
        setAnios(data.map(item => item.año));
        setTotalesPorAnio(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas por año:', error);
      }
    };

    const cargaVentasEmpleado = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorEmpleado');
        const data = await response.json();
        setEmpleados(data.map(item => item.empleado));
        setTotalesPorEmpleado(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas por empleado:', error);
      }
    };

    const cargaVentasDia = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorDia');
        const data = await response.json();
        setDias(data.map(item => item.dia));
        setTotalesPorDia(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas por día:', error);
      }
    };

    cargaVentasMes();
    cargaVentasAnio();
    cargaVentasEmpleado();
    cargaVentasDia(); // 👈 LLAMADA NUEVA
  }, []);

  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      <Row className="mt-4">
        <Col xs={12} md={6} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>

        <Col xs={12} md={6} className="mb-4">
          <VentasPorEmpleado empleados={empleados} totales_por_empleado={totalesPorEmpleado} />
        </Col>

        <Col xs={12} md={6} className="mb-4">
          <VentasPorAnio anios={anios} totales_por_anio={totalesPorAnio} />
        </Col>

        

        <Col xs={12} md={6} className="mb-4">
          <VentasPorDia dias={dias} totales_por_dia={totalesPorDia} /> {/* 👈 NUEVO GRÁFICO */}
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
