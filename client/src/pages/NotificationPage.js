import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

    // Function to mark all notifications as read
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.success);
            } else {
                message.error(res.data.error);
            }
        } catch (err) {
            console.log(err);
            dispatch(hideLoading());
            message.error("Something went wrong");
        }
    };

    // Function to delete all read notifications
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.messages);
            } else {
                message.error(res.data.messages);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error("Something went wrong");
        }
    };

    // Separate components for tab contents
    const UnreadNotificationsContent = () => (
        <div>
            <div className='d-flex justify-content-end '>
                <h4 className='p-2' onClick={handleMarkAllRead} style={{ cursor: 'pointer' }}>Mark All Read</h4>
            </div>
            {user?.notification.map(notificationMsg => (
                <div className='card' key={notificationMsg._id} style={{ cursor: 'pointer' }}>
                    <div className='card-text' onClick={() => navigate(notificationMsg.onclickPath)}>
                        {notificationMsg.message}
                    </div>
                </div>
            ))}
        </div>
    );

    const ReadNotificationsContent = () => (
        <div>
            <div className='d-flex justify-content-end '>
                <h4 className='p-2 text-primary ' style={{ cursor: 'pointer' }} onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
            {user?.seennotification.map(notificationMsg => (
                <div className='card' key={notificationMsg._id} style={{ cursor: 'pointer' }}>
                    <div className='card-text' onClick={() => navigate(notificationMsg.onclickPath)}>
                        {notificationMsg.message}
                    </div>
                </div>
            ))}
        </div>
    );

    // Define tabs using the `items` prop
    const tabItems = [
        {
            label: 'Unread',
            key: 'unread',
            children: <UnreadNotificationsContent />,
        },
        {
            label: 'Read',
            key: 'read',
            children: <ReadNotificationsContent />,
        },
    ];

    return (
        <Layout>
            <h4 className='p-3 text-center'>Notification Page</h4>
            <Tabs items={tabItems} />
        </Layout>
    );
};

export default NotificationPage;
