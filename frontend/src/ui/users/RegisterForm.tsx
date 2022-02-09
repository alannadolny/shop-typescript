import * as yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

function RegisterForm() {
  interface YupSchema {
    login: string;
    password: string;
    email: string;
  }

  const [success, setSuccess] = useState<string>('');

  const validationSchema: yup.SchemaOf<YupSchema> = yup.object({
    login: yup
      .string()
      .required('Login is required')
      .min(4, 'Login should be of minimum 8 characters length'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(4, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik: FormikValues = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: YupSchema, { resetForm }) => {
      axios
        .post('http://localhost:5432/users/register', values)
        .then((data: AxiosResponse) => {
          if (data.status === 200) {
            resetForm();
            setSuccess(
              'We have sent you a confirmation email, after confirming it, you will be able to log in'
            );
          }
        })
        .catch((_) => {
          setSuccess('Email or Login already exists');
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
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
          Register
        </Button>
      </form>
      <Typography variant='h6' color='primary'>
        {success}
      </Typography>
    </div>
  );
}

export default RegisterForm;
