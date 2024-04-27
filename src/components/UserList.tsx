import { useSelector } from 'react-redux';
import logo from '../assets/user_icon.svg';
import { fetchUsers, selectUsersSlice } from '../redux/slices/apiSlice';
import { useAppDispatch } from '../redux/store';
import React from 'react';
import UserCard from './UserCard';

const UserList: React.FC = () => {
  const { items } = useSelector(selectUsersSlice);

  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <>
      <div className='user-list'>
        {items.map((user) => (
          <div key={user.id} className='user-item' onClick={() => handleUserClick(user.id)}>
            <div className='user-item-wrapper'>
              <img src={logo} alt='user' />
              {user.name}
            </div>
          </div>
        ))}
      </div>
      {selectedUserId && <UserCard userId={selectedUserId} />}
    </>
  );
};

export default UserList;
