import './App.css';
import LandingPage from './screens/landingPage/LandingPage';
import { Routes, Route } from "react-router-dom";
import MyNotes from './components/myNotes/MyNotes';
import LoginPage from './screens/loginPage/LoginPage';
import RegisterPage from './screens/registerPage/RegisterPage';
import CreateNotes from './components/createNote/CreateNotes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditNote from './components/myNotes/EditNote';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mynotes/createnotes" element={<CreateNotes />} />
        <Route path="/note/:id" element={<EditNote />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
