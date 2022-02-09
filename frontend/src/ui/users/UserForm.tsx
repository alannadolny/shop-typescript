import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function UserForm() {
  type actionParams = {
    action: string;
  };

  const { action } = useParams<actionParams>();

  return (
    <Container>
      <Typography variant='h1' color='secondary'>
        {action === 'login' ? 'Sign in' : 'Register'}
      </Typography>
      {action === 'login' ? <LoginForm /> : <RegisterForm />}
    </Container>
  );
}

export default UserForm;
