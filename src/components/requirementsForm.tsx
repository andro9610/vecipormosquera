import { Form, Row, Col, Button, Image, Accordion, Container } from 'react-bootstrap';
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { HelpTooltip } from '../fragments/HelpTooltip';
import { handleDragEnd, SortableTextareaItem } from '../fragments/sortableTextAreaItem';
import { useRequirementContext } from '../context/requirementsContext';
import { useDocumentTools } from '../hooks/generateDocument';

export const RequirementsForm = () => {
    const { state, dispatch } = useRequirementContext();
    const { actuacionPrevia, solicitante, peticiones, hechos } = state;
    const { generateDocument } = useDocumentTools();
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
        useSensor(MouseSensor),
    );

    const handleDragEndPeticiones = (event: DragEndEvent) => {
        handleDragEnd(event, () => {
            dispatch({
                type: 'REORDER_PETICIONES',
                payload: { activeId: String(event.active.id), overId: String(event.over?.id) },
            });
        })
    }

    const handleDragEndHechos = (event: DragEndEvent) => {
        handleDragEnd(event, () => {
            dispatch({
                type: 'REORDER_HECHOS',
                payload: { activeId: String(event.active.id), overId: String(event.over?.id) },
            });
        })
    }

    return (
        <Container>
            <Row className="align-items-center my-2">
                <Col xs="auto" className="d-flex align-items-center p-0">
                    <Image
                        src="public\logo_img.png"
                        className="ms-3"
                        alt="Logo"
                        style={{ maxWidth: '80px', width: '100%', objectFit: 'contain' }}
                    />
                </Col>
                <Col className="d-flex align-items-center p-0 ms-4" style={{ minWidth: 0 }}>
                    <h1
                        className="mb-0 text-sm-start"
                        style={{
                            whiteSpace: 'nowrap',
                            lineHeight: 1.1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Solicitud de revisión
                    </h1>
                </Col>
            </Row>

            <Accordion defaultActiveKey="0" className="mt-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <span className="d-flex align-items-center">
                            <b>Actuación previa</b>
                            <HelpTooltip text="Aqui puede indicar cual es la actuación o documento que motiva la solicitud" />
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form.Group id="ActuacionPrevia" className="my-3">
                            <Form.Label>Actuación Previa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Impuesto predial XXXX para el año 2026"
                                value={actuacionPrevia}
                                onChange={(event) => dispatch({ type: 'SET_ACTUACION_PREVIA', payload: event.target.value })}
                            />
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <span className="d-flex align-items-center">
                            <b>Información del solicitante</b>
                            <HelpTooltip text="En las siguientes direcciones se notificará, comunicará o enviará la respuesta, se recomienda escribir bien las direcciones y asegurarse que sea una dirección reciente o que se revise frecuentemente." />
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form.Group id="Tratamiento" className="mb-3">
                            <Form.Label>Tratamiento</Form.Label>
                            <Form.Select
                                value={solicitante.tratamiento}
                                onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'tratamiento', value: event.target.value } })}
                            >
                                <option value="">- Seleccione una opcion -</option>
                                <option value="Sr">Señor</option>
                                <option value="Sra">Señora</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group id="Nombre completo" className="mb-3">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Juan Perez"
                                value={solicitante.nombre}
                                onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'nombre', value: event.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group id="Numero de cedula" className="mb-3">
                            <Form.Label>Numero de cedula</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ej: 12345678"
                                value={solicitante.cedula}
                                onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'cedula', value: event.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group id="Dirección" className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Calle X con Carrera Y"
                                value={solicitante.direccion}
                                onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'direccion', value: event.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group id="Celular" className="mb-3">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ej: 300 234 4955"
                                value={solicitante.celular}
                                onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'celular', value: event.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group id="Correo electrónico" className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ej: correo@dominio.com"
                                value={solicitante.correo}
                                onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'correo', value: event.target.value } })}
                            />
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <span className="d-flex align-items-center">
                            <b>Peticiones</b>
                            <HelpTooltip text="Escribir las peticiones/preguntas de la manera más clara posible, utilizando al inicio frases como “se me informe”, “se me indique”, o “se me señale”." />
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndPeticiones}>
                            <SortableContext items={peticiones.map((peticion: { id: string }) => peticion.id)} strategy={verticalListSortingStrategy}>
                                {peticiones.map((peticion: { id: string; value: string }) => (
                                    <SortableTextareaItem
                                        key={peticion.id}
                                        id={peticion.id}
                                        value={peticion.value}
                                        placeholder="Descripción de la petición"
                                        onChange={(id: string, value: string) => dispatch({ type: 'UPDATE_PETICION', payload: { id, value } })}
                                        onRemove={(id: string) => dispatch({ type: 'REMOVE_PETICION', payload: id })}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                        <Button variant="outline-primary" type="button" onClick={() => dispatch({ type: 'ADD_PETICION' })}>
                            Agregar petición
                        </Button>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        <span className="d-flex align-items-center">
                            <b>Hechos</b>
                            <HelpTooltip text="Escribir los hechos en orden cronológico, del más antiguo y al más reciente, y de manera clara y corta para que cada uno sea entendible. No hay un límite máximo de hechos." />
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndHechos}>
                            <SortableContext items={hechos.map((hecho: { id: string }) => hecho.id)} strategy={verticalListSortingStrategy}>
                                {hechos.map((hecho: { id: string; value: string }) => (
                                    <SortableTextareaItem
                                        key={hecho.id}
                                        id={hecho.id}
                                        value={hecho.value}
                                        placeholder="Descripción del hecho"
                                        onChange={(id: string, value: string) => dispatch({ type: 'UPDATE_HECHO', payload: { id, value } })}
                                        onRemove={(id: string) => dispatch({ type: 'REMOVE_HECHO', payload: id })}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                        <Button variant="outline-primary" type="button" onClick={() => dispatch({ type: 'ADD_HECHO' })}>
                            Agregar hecho
                        </Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Row className="justify-content-end mt-3">
                <Col xs="auto">
                    <Button variant="primary" type="button" onClick={() => dispatch({ type: 'INSERT_SAMPLE_DATA' })}>
                        Llenar Form
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" type="button" onClick={() => generateDocument(state)}>
                        Generar Documento
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};