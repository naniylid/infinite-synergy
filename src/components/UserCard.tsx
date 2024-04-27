import React, { useEffect } from 'react';
import profile from '../assets/profile-default.png';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUser,
  setEditedName,
  setEditedCompany,
  setEditedEmail,
  setEditedWebsite,
  selectUserSlice,
} from '../redux/slices/userSlice';
import { Users } from '../types/types';

const UserCard: React.FC<{ userId: number }> = ({ userId }) => {
  const dispatch = useDispatch();
  const { user, editedName, editedEmail, editedCompany, editedWebsite } =
    useSelector(selectUserSlice);

  //Получение пользователя
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get<Users>(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        dispatch(setUser(data));
        dispatch(setEditedName(data.name));
        dispatch(setEditedEmail(data.email));
        dispatch(setEditedCompany(data.company.name));
        dispatch(setEditedWebsite(data.website));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [dispatch, userId]);

  //Сохранение измениний при нажатии на кнопку
  const handleSave = async () => {
    try {
      const updatedData: Partial<Users> = {};

      if (editedName !== user?.name) {
        updatedData.name = editedName;
      }
      if (editedEmail !== user?.email) {
        updatedData.email = editedEmail;
      }
      if (editedCompany !== user?.company?.name) {
        updatedData.company = { name: editedCompany };
      }
      if (editedWebsite !== user?.website) {
        updatedData.website = editedWebsite;
      }

      if (Object.keys(updatedData).length > 0) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, updatedData);
        alert('Пользователь успешно изменен!');
      } else {
        alert('Изменений не было');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  if (!user) {
    return <>Загрузка...</>;
  }

  return (
    <div className='user-card'>
      <img src={profile} alt='Фото профиля' />
      <ul className='user-card_info'>
        <li>
          <label htmlFor='name'>Имя:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={editedName}
            onChange={(e) => dispatch(setEditedName(e.target.value))}
          />
        </li>
        <li>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            name='email'
            value={editedEmail}
            onChange={(e) => dispatch(setEditedEmail(e.target.value))}
          />
        </li>
        <li>
          <label htmlFor='company'>Компания:</label>
          <input
            type='text'
            id='company'
            name='company'
            value={editedCompany}
            onChange={(e) => dispatch(setEditedCompany(e.target.value))}
          />
        </li>
        <li>
          <label htmlFor='website'>Сайт:</label>
          <input
            type='text'
            id='website'
            name='website'
            value={editedWebsite}
            onChange={(e) => dispatch(setEditedWebsite(e.target.value))}
          />
        </li>
        <button onClick={handleSave}>Сохранить</button>
      </ul>
    </div>
  );
};

export default UserCard;
