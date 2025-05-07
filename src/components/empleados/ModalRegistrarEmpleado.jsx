// ModalRegistroEmpleado.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreEmpleado">
            <Form.Label>Primer Nombre </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
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
              value={nuevoEmpleado.segundo_nombre}
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
              value={nuevoEmpleado.primer_apellido}
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
              value={nuevoEmpleado.segundo_apellido}
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
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el numero de telefono (máx. 8 caracteres)"
              maxLength={8}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejarCambioInput}
              placeholder="Ingresa el cargo (máx. 16 caracteres)"
              maxLength={16}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Label>Fecha de contrato</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la fecha de contrato(máx. 8 caracteres)"
              maxLength={10}
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
        <Button variant="primary" onClick={agregarEmpleado}>
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;
