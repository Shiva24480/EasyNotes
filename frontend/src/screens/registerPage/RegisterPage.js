import React, { useEffect, useState } from 'react'
import './RegisterPage.css'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'

function RegisterPage() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    // const [pic, setPic] = useState();

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = user;
        if (!name || !email || !password) {
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

            const { data } = await axios.post('http://localhost:5000/api/users', {
                name,
                email,
                password,
                // pic,
            }, config
            );

            // console.log(data);
            localStorage.setItem('notes-app-user', JSON.stringify(data));
            setLoading(false);

        } catch (error) {
            setLoading(false);
            toast.error('Something went Wrong, Please try again', toastStyle);
        }
    }

    useEffect(()=>{
        const user = localStorage.getItem('notes-app-user');
        if(user){
            navigate('/mynotes');
        }
    },[handleChange]);

    const toastStyle = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    return (
        <div className="register">
            <div className="register-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                        <h3>Username</h3>
                        <input type="text" name='name' onChange={handleChange} />
                    </div>
                    <div className="user-box">
                        <h3>Email</h3>
                        <input type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className="user-box">
                        <h3>Password</h3>
                        <input type="password" name='password' onChange={handleChange} />
                    </div>
                    {/* <div className="user-box">
                        <h3>Profile Picture</h3>
                        <input type="file" name='pic' onChange={(e) => { postDetails(e.target.files[0]) }} />
                    </div> */}
                    <div className='register-button' onClick={handleSubmit}>
                        {
                            loading === true ?
                                (loading && <Spinner color='white' />) :
                                ('Submit')
                        }
                    </div>
                </form>
                <div className='login-link'>
                    <p>Already have an Account!</p>
                    <div className="link">
                        <Link to="/login">
                            <span>LOGIN</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage