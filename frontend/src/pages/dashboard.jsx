import { useEffect, useState, useCallback } from 'react';
import { Card, FloatingLabel, Row, Form, Col, Button, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { notes } from "../components/api.jsx";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "../context/auth.jsx";
import { Bounce, toast, ToastContainer } from "react-toastify";

const NoteForm = ({ onSubmit, errors, register }) => (
    <Container className="p-3 my-3 bg-dark rounded">
        <Row>
            <Col>
                <FloatingLabel controlId="floatingInput" label="Title" className="mb-lg-0 mb-md-3">
                    <Form.Control
                        type="text"
                        placeholder="Add title"
                        {...register('title')}
                    />
                    {errors.title && <p className="text-danger">{errors.title.message}</p>}
                </FloatingLabel>
            </Col>
            <Col>
                <FloatingLabel controlId="floatingTextarea2" label="Content">
                    <Form.Control
                        as="textarea"
                        placeholder="Add content"
                        style={{ height: '50px' }}
                        {...register('content')}
                    />
                    {errors.content && <p className="text-danger">{errors.content.message}</p>}
                </FloatingLabel>
            </Col>
            <Col>
                <Button type="button" className="col-12 py-3" onClick={onSubmit}>Add Note</Button>
            </Col>
        </Row>
    </Container>
);

const NoteCard = ({ note, onEdit, onDelete }) => (
    <Col>
        <Card className="my-2">
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <hr />
                <Card.Text>{note.content}</Card.Text>
                <div className="d-flex justify-content-end">
                    <FiEdit size={30} className="me-2" onClick={() => onEdit(note)} />
                    <RiDeleteBin5Line size={30} onClick={() => onDelete(note._id)} />
                </div>
            </Card.Body>
        </Card>
    </Col>
);

const NotesList = ({ notes, onEdit, onDelete }) => (
    <Container>
        <Row lg={3} md={2} sm={1}>
            {notes?.map((note, index) => (
                <NoteCard key={index} note={note} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </Row>
    </Container>
);

const NoteModal = ({ show, handleClose, note, register, handleSubmit, onSubmit, errors }) => (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                    <Form.Control
                        type="text"
                        defaultValue={note.title}
                        placeholder="Add title"
                        {...register('updatedTitle')}
                    />
                    {errors.updatedTitle && <p className="text-danger">{errors.updatedTitle.message}</p>}
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" label="Content">
                    <Form.Control
                        as="textarea"
                        defaultValue={note.content}
                        placeholder="Add content"
                        style={{ height: '50px' }}
                        {...register('updatedContent')}
                    />
                    {errors.updatedContent && <p className="text-danger">{errors.updatedContent.message}</p>}
                </FloatingLabel>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button type="submit" variant="primary">Update</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </Modal>
);

function Dashboard() {
    const [notesList, setNotesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const { user, token } = useSession();

    const schema = z.object({
        title: z.string().nonempty("Title is required"),
        content: z.string().nonempty("Content is required"),
    });

    const updateSchema = z.object({
        updatedTitle: z.string().nonempty("Title is required"),
        updatedContent: z.string().nonempty("Content is required"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            content: ''
        }
    });

    const { register: updateRegister, handleSubmit: handleUpdateSubmit, formState: { errors: updateErrors }, reset: resetUpdateForm } = useForm({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            updatedTitle: currentNote?.title,
            updatedContent: currentNote?.content
        }
    });

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${notes}/${user.id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setNotesList(response.data.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    }, [user.id]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const addNote = async (data) => {
        try {
            const updatedData = { ...data, userId: user.id };
            await axios.post(notes, updatedData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            toast.success('Note Saved Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            reset();
            await fetchNotes();
        } catch (error) {
            console.log(error.response?.data || "An error occurred");
        }
    };

    const handleEdit = (note) => {
        setCurrentNote(note);
        setShow(true);
    };

    const updateNote = async (data) => {
        try {
            const updatedData = { title: data.updatedTitle, content: data.updatedContent };
            await axios.put(`${notes}/${currentNote._id}`, updatedData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            toast.success('Note Updated Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setShow(false);
            resetUpdateForm();
            setCurrentNote(null);
            await fetchNotes();
        } catch (error) {
            console.log(error.response?.data || "An error occurred");
        }
    };

    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`${notes}/${noteId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            toast.success('Note Deleted Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            await fetchNotes();
        } catch (error) {
            console.log(error.response?.data || "An error occurred");
        }
    };
    const handleClose = () => {
        setCurrentNote(null);
        setShow(false);
        resetUpdateForm();
    }

    return (
        <>
            <ToastContainer />
            <NoteForm onSubmit={handleSubmit(addNote)} errors={errors} register={register} />
            {loading ? <p>Loading...</p> : <NotesList notes={notesList} onEdit={handleEdit} onDelete={handleDelete} />}
            {currentNote && (
                <NoteModal
                    show={show}
                    handleClose={handleClose}
                    note={currentNote}
                    register={updateRegister}
                    handleSubmit={handleUpdateSubmit}
                    onSubmit={updateNote}
                    errors={updateErrors}
                />
            )}
        </>
    );
}

export default Dashboard;
