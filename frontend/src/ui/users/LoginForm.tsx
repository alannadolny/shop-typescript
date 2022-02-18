import * as yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/users/operations';
import { LoggedUserProps, YupSchema } from '../interfaces';

axios.defaults.withCredentials = true;

function LoginForm({ getUser }: LoggedUserProps) {
  const [success, setSuccess] = useState<string>('');

  const validationSchema: yup.SchemaOf<YupSchema> = yup.object({
    login: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
  });

  const formik: FormikValues = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: YupSchema) => {
      axios
        .post('http://localhost:5432/users/login', values, {
          withCredentials: true,
        })
        .then((data: AxiosResponse) => {
          if (data.status === 200) {
            if (data.data === 'not active')
              setSuccess(
                'You have to confirm your email address before continuing'
              );
            else getUser();
          }
        })
        .catch((err) => {
          setSuccess('Login or password are not correct');
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='login'
          name='login'
          label='Login'
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          style={{ margin: '10px' }}
          color='secondary'
          variant='contained'
          fullWidth
          type='submit'
        >
          Login
        </Button>
      </form>
      <Typography variant='h6' color='primary'>
        {success}
      </Typography>
    </div>
  );
}

const mapDispatchToProps = {
  getUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);
