import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, NavDropdown } from "react-bootstrap";
import logo from "/vite.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../App.css";

const Encabezado = () => {
  const [estaColapsado, setEstaColapsado] = useState(false);
  const navegar = useNavigate();
  const ubicacion = useLocation();

  const estaLogueado = !!localStorage.getItem("usuario") && !!localStorage.getItem("contraseña");

  const cerrarSesion = () => {
    setEstaColapsado(false);
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  const alternarColapso = () => setEstaColapsado(!estaColapsado);

  const navegarA = (ruta) => {
    navegar(ruta);
    setEstaColapsado(false);
  };

  return (
    <Navbar expand="sm" fixed="top" className="color-navbar">
      <Container>
        <Navbar.Brand
          onClick={() => navegarA("/inicio")}
          className="text-white"
          style={{ cursor: "pointer" }}
        >
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{" "}
          <strong>Ferretería Ileana Cabrera</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" onClick={alternarColapso} />

        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
          show={estaColapsado}
          onHide={() => setEstaColapsado(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-sm"
              className={estaColapsado ? "color-texto-marca" : "text-white"}
            >
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">

              <Nav.Link
                onClick={() => navegarA("/inicio")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Inicio</strong>
              </Nav.Link>

              <NavDropdown
                title={
                  <span>
                    {estaColapsado && <i className="bi-bag-heart-fill me-2"></i>}
                    Productos
                  </span>
                }
                id="basic-nav-dropdown"
                className={estaColapsado ? "titulo-negro" : "titulo-blanco"}
              >
                <NavDropdown.Item
                  onClick={() => navegarA("/productos")}
                  className="text-black"
                >
                  {estaColapsado ? <i className="bi-box2-heart-fill me-2"></i> : null}
                  <strong>Gestión Productos</strong>
                </NavDropdown.Item>

                <NavDropdown.Item
                  className="text-black"
                  onClick={() => navegarA("/categorias")}
                >
                  {estaColapsado ? <i className="bi-bookmarks-fill me-2"></i> : null}
                  <strong>Gestión Categorías</strong>
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => navegarA("/catalogoproductos")}
                  className="text-black"
                >
                  {estaColapsado ? <i className="bi-images me-2"></i> : null}
                  <strong>Catálogo Productos</strong>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                onClick={() => navegarA("/Clientes")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Clientes</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/Empleado")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Empleado</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/Compras")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Compras</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/Dashboard")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Dashboard</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/Ventas")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Ventas</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/Estadisticas")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Estadisticas</strong>
              </Nav.Link>

              {estaLogueado ? (
                <Nav.Link
                  onClick={cerrarSesion}
                  className={estaColapsado ? "text-black" : "text-white"}
                >
                  Cerrar Sesión
                </Nav.Link>
              ) : (
                ubicacion.pathname === "/" && (
                  <Nav.Link
                    onClick={() => navegarA("/")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    Iniciar Sesión
                  </Nav.Link>
                )
              )}

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
