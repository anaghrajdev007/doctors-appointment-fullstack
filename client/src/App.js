import logo from './logo.svg';
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import {useSelector} from "react-redux"
import Spinner from './components/spinner';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
function App() {
  const {loding} = useSelector(state => state.alerts)
  return (
   <>
    <BrowserRouter>
    {loding ? <Spinner/>:
    <Routes>
        <Route path='/' element={
          <ProtectedRoutes>
            <HomePage/>
          </ProtectedRoutes>
        }/>
        <Route path='/apply-doctor' element={
          <ProtectedRoutes>
            <ApplyDoctor/>
          </ProtectedRoutes>
        }/>
        <Route path='/admin/users' element={
          <ProtectedRoutes>
            <Users/>
          </ProtectedRoutes>
        }/>
        <Route path='/admin/doctors' element={
          <ProtectedRoutes>
            <Doctors/>
          </ProtectedRoutes>
        }/>
         <Route path='/doctor/profile/:id' element={
          <ProtectedRoutes>
            <Profile/>
          </ProtectedRoutes>
        }/>
        <Route path='/doctor/book-appointment/:doctorId' element={
          <ProtectedRoutes>
            <BookingPage/>
          </ProtectedRoutes>
        }/>
        <Route path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
        <Route path='/notification' element={
          <ProtectedRoutes>
            <NotificationPage/>
          </ProtectedRoutes>
        }/>
        <Route path='/register' element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
        }/>
      </Routes>
    
    }
      
    </BrowserRouter>
   </>
  );
}

export default App;
