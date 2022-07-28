import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '@chakra-ui/react'

function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        if (!email || !password) {
            toast.error("Please fill all the field", toastStyle);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true);

            const { data } = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            }, config
            );
            localStorage.setItem('notes-app-user', JSON.stringify(data));
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            toast.error('Invalid username or password', toastStyle);
        }
    }

    useEffect(()=>{
        const user = localStorage.getItem('notes-app-user');
        if(user){
            navigate('/mynotes');
        }
    },[handleSubmit]);

    const toastStyle = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    return (
        <div className="login">
            <div className="login-box">
                <h2>LOGIN</h2>
                <form>
                    <div className="user-box">
                        <h3>Email</h3>
                        <input type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className="user-box">
                        <h3>Password</h3>
                        <input type="password" name='password' onChange={handleChange} />
                    </div>
                    <div className='login-button' onClick={handleSubmit}>
                        {
                            loading === true ?
                                (loading && <Spinner color='white' />) :
                                ('Submit')
                        }
                    </div>
                </form>
                <div className='register-link'>
                    <p>Create New Account</p>
                    <div className="link">
                        <Link to="/register">
                            <span>REGISTER</span>
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginPage