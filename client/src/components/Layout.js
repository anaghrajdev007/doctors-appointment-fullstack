import React from 'react';
import '../styles/LayoutStyles.css';
import { Avatar, Badge, message } from 'antd';
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
    // Adjusted useSelector call to match the nested structure
    const user = useSelector(state => state.user.user); // Adjusted here

    const location = useLocation();
    const navigate = useNavigate(); // For programmatically navigating after logout

    const handleLogout = () => {
        localStorage.clear();
        message.success('Logout successful');
        navigate('/login'); // Redirect to login after logout
    };

    const isActive = (path) => location.pathname === path;

    //Doctor Menu
    const doctorMenu = [
        {
            name : 'Home',
            path : '/',
            icon : "fa-solid fa-house"
        },
        {
            name : 'Appointments',
            path : '/doctor-appointments',
            icon : "fa-solid fa-list"
        },
        
        {
            name : 'Profile',
            path : `/doctor/profile/${user?._id}`,
            icon : "fa-solid fa-user"
        },
       
    ];
    //Doctor Menu

    // Selecting the correct menu based on isAdmin status
    const SidebarMenu = user?.isAdmin 
    ? adminMenu 
    : user?.isDoctor 
    ? doctorMenu 
    : userMenu;

    return (
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        <h6>DOC APP</h6>
                        <hr/>
                    </div>
                    <div className='menu'>
                        {SidebarMenu.map((menu, index) => (
                            <div key={index} className={`menu-item ${isActive(menu.path) ? "active" : ""}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        ))}
                        <div className="menu-item" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>LOGOUT</span>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <div className='header-content' style={{cursor:"pointer"}}>
                        <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification')}} >
                        <i className="fa-solid fa-bell"></i>
                        </Badge>
                            
                            <Link to='/profile'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
