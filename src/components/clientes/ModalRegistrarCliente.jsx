// ModalRegistroCliente.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCliente">
            <Form.Label>Primer Nombre </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el apellido (máx. 20 caracteres)"
              maxLength={20}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el apellido (máx. 20 caracteres)"
              maxLength={20}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formCelular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el numero de telefono (máx. 8 caracteres)"
              maxLength={8}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la dirección (máx. 50 caracteres)"
              maxLength={50}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ingresa el numero de cedula (máx. 16 caracteres)"
              maxLength={16}
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCliente}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;
