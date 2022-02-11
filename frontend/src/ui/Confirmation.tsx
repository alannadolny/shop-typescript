import { Container, Typography, Button } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Confiration() {
  const { login, userId } = useParams<string>();
  const [active, setActive] = useState<boolean>(true);
  const [info, setInfo] = useState<string>('');
  return (
    <Container>
      <Typography color='secondary' variant='h2'>
        Hi {login}!
      </Typography>
      <Typography
        color='secondary'
        variant='h4'
        style={{ marginBottom: '10px' }}
      >
        The last thing to active your account is clicking the button below.
      </Typography>
      {active ? (
        <Button
          size='large'
          variant='outlined'
          color='secondary'
          onClick={() => {
            axios
              .put('http://localhost:5432/users/confirm', {
                id: userId,
                login,
              })
              .then((data: AxiosResponse) => {
                console.log(data.data);
                if (data.status === 200) {
                  if (data.data === 'not found')
                    setInfo(`This account is active or doesn't exist`);
                  else setActive(false);
                }
              })
              .catch();
          }}
        >
          Active your account
        </Button>
      ) : (
        <Button size='large' variant='outlined' color='secondary' disabled>
          {' '}
          Your account is now active!{' '}
        </Button>
      )}
      <Typography variant='h6' color='primary'>
        {info}
      </Typography>
    </Container>
  );
}

export default Confiration;
