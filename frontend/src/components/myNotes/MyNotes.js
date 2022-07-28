import React, { useEffect, useState } from 'react'
import './MyNotes.css'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import MainScreen from '../../screens/mainScreen/MainScreen'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Badge,
} from '@chakra-ui/react'
import axios from 'axios'

function MyNotes() {
    const [notes, setNotes] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [rerender, setRerender] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm('sure want to delete')) {
            if (currentUser) {
                deleteApi(currentUser?.token, id);
            }
        }
    }

    async function deleteApi(token, id) {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            // console.log(response.request.status);
            setRerender(!rerender);
        } catch (error) {
            throw new Error("something went wrong ");
        }
    }

    async function fetch(token) {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/notes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
            setNotes(response.data);
            return;
        } catch (error) {
            throw new Error("something went wrong ");
        }
    }

    useEffect(() => {
        async function fetchUser() {
            if (localStorage.getItem('notes-app-user')) {
                setCurrentUser(JSON.parse(await localStorage.getItem('notes-app-user')));
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        // console.log(currentUser?.token);
        if (currentUser) {
            fetch(currentUser.token);
        }
    }, [currentUser,rerender]);


    return (
        <div>
            <MainScreen title={`Welcome ${currentUser?.name}`}>
                <Link to='createnotes' style={{ textDecoration: 'none' }}>
                    <Button style={{ marginBottom: '1rem' }}>Create New Note</Button>
                </Link>
                {
                    notes.length > 0 ?
                        (notes.map(note => (
                            <Accordion key={note._id} defaultIndex={[1]} allowMultiple>
                                <AccordionItem>
                                    <div className='accordion-header'>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                {note.title}
                                            </Box>
                                        </AccordionButton>
                                        <Link to={`/note/${note._id}`}>
                                            <Button>Edit</Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(note._id)} variant='danger' style={{ marginLeft: '0.5rem' }}>Delete</Button>
                                    </div>
                                    <AccordionPanel pb={4}>
                                        <Badge style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }} colorScheme='purple'>Category-{note.category}</Badge>
                                        <div>
                                            {note.content}
                                        </div>
                                        <p className='accordion-date'>
                                            Created on - {note.updatedAt.substr(0,10)}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        ))) :
                        (
                            <h1>Please make notes by clicking on Create New Note BUTTON</h1>
                        )
                }
            </MainScreen>
        </div >
    )
}

export default MyNotes