import {useEffect, useState} from 'react';
import axios from 'axios';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://localhost:8000/api/admin/users/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Ошибка загрузки пользователей:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Список пользователей</h2>
            <ul className="space-y-3">
                {users.map(user => (
                    <li key={user.id} className="border p-3 rounded-md">
                        <p><strong>Логин:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Админ:</strong> {user.is_staff ? 'Да' : 'Нет'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsersPage;
