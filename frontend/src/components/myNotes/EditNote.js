import React, { useEffect, useState } from 'react'
import MainScreen from '../../screens/mainScreen/MainScreen'
// import './CreateNotes.css'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useNavigate,
    useParams
} from "react-router-dom";

function EditNote() {
    const navigate = useNavigate();
    const [title, setTitle] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [content, setContent] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    let { id } = useParams();
    const handleSubmit = () => {
        if (!title || !category || !content) {
            toast.error("Please fill all the field", toastStyle);
            return;
        } else {
            const obj = {
                "title": title,
                "content": content,
                "category": category
            }
            if (currentUser?.token && id) {
                editNoteApi(currentUser.token, id, obj);
                toast.success("Updated successfully", toastStyle);
            }
            navigate("/mynotes");
        }
    }

    async function fetchNote(token, id) {
        try {
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGU0ZmIwYzc2MjA0Zjg2ZmJjZmU0YyIsImlhdCI6MTY1ODczNjU2MCwiZXhwIjoxNjYxMzI4NTYwfQ.4gDz5Qk8m4S4KbT5RSnq1F4XEXSbcrTc6TTvM8NK1Jk';
            const response = await axios.get(
                `http://localhost:5000/api/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            // console.log(response.request.status);
            if (response.request.status === 200) {
                const data = response.data;
                
                setTitle(data.title);
                setCategory(data.category);
                setContent(data.content);
            }
        } catch (error) {
            throw new Error("something went wrong ");
        }
    }

    async function editNoteApi(token, id, obj) {
        try {
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGU0ZmIwYzc2MjA0Zjg2ZmJjZmU0YyIsImlhdCI6MTY1ODczNjU2MCwiZXhwIjoxNjYxMzI4NTYwfQ.4gDz5Qk8m4S4KbT5RSnq1F4XEXSbcrTc6TTvM8NK1Jk';
            const response = await axios.put(
                `http://localhost:5000/api/notes/${id}`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            // if (response.request.status === 201) {
            //     toast.success("Note successfully created", toastStyle);
            // }
            // navigate("/mynotes");
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

    useEffect(()=>{
        if(id && currentUser){
            fetchNote(currentUser.token,id);
        }
    },[currentUser,id])

    const toastStyle = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    return (
        <MainScreen title="Edit your note here">
            <Box>
                <Text mb='8px' m='1rem 0rem' fontSize='1.4rem'>Title</Text>
                <Input
                    value={title}
                    isInvalid
                    errorBorderColor='red.300'
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Text m='1rem 0rem' fontSize='1.4rem' mb='8px'>Category</Text>
                <Input
                    value={category}
                    isInvalid
                    errorBorderColor='red.300'
                    placeholder='Category'
                    onChange={(e) => setCategory(e.target.value)}
                />

                <Text m='1rem 0rem' fontSize='1.4rem' mb='8px'>Content</Text>
                <textarea
                    value={content}
                    className='textarea'
                    placeholder='Enter your Content here'
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <Button onClick={handleSubmit} colorScheme='teal' size='md'>Submit</Button>
            </Box>
        </MainScreen>
    )
}

export default EditNote