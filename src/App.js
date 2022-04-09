import './App.css';
import UserForm from './components/UserForm';
import { UsersProvider, UsersContext} from './contexts/usersContext';
import { useContext } from 'react';

function App() {

  return (
    <UsersProvider>
      <div>
        <UserForm />
      </div>
      <Test/>
    </UsersProvider>
  );
}

function Test() {
  const {users} = useContext(UsersContext);

  return <div>{users.map(user => <div>{user.name}</div>)}</div>
}

export default App;
