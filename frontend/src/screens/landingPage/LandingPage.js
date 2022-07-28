import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LandingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const email = "guest@gmail.com";
            const password = '1234';

            setLoading(true);

            const { data } = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            }, config
            );
            localStorage.setItem('notes-app-user', JSON.stringify(data));
            setLoading(false);
            navigate('/mynotes')

        } catch (error) {
            setLoading(false);
            toast.error('Invalid username or password', toastStyle);
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('notes-app-user');
        if (user) {
            navigate('/mynotes');
        }
    }, []);

    const toastStyle = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    return (
        <div className='landing'>
            <Container>
                <Row>
                    <div className='landing-content'>
                        <h1 className='title'>Welcome to Easy Notes</h1>
                    </div>
                    <div className="button-container">
                        <a href="/login">
                            <Button style={{ marginRight: "1rem" }} >Login</Button>
                        </a>
                        <a href="/register">
                            <Button style={{ marginLeft: "1rem" }} variant='outline-primary'>Sign up</Button>
                        </a>
                    </div>
                    <div className='guest-button'>
                        <Button onClick={handleSubmit} style={{ marginLeft: "1rem", padding: '0.5rem 1rem' }} variant='danger'>
                            {
                                loading === true ?
                                    (loading && <Spinner color='white' />) :
                                    ('Guest user credentials')
                            }
                        </Button>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage