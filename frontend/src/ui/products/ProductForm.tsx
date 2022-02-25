import * as yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { ProductFormProps, ProductYupSchema } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { sellProduct } from '../../ducks/products/operation';

function ProductForm({ sellProduct }: ProductFormProps) {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    category: yup.string().required('Category is required'),
    price: yup
      .number()
      .required('Price is required')
      .min(1, 'Price should be higher than 0'),
    description: yup.string().required('Description is required'),
    image: yup.string().required('Image url is required'),
  });

  const formik: FormikValues = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: 0,
      description: '',
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: ProductYupSchema, actions) => {
      sellProduct(values);
      actions.resetForm();
    },
  });

  return (
    <div style={{ margin: '40px' }}>
      <Typography variant='h5' color='secondary'>
        Enter product details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='name'
          name='name'
          label='Name'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.ame && formik.errors.name}
        />
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='category'
          name='category'
          label='Category'
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='price'
          name='price'
          label='Price'
          type='number'
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='description'
          name='description'
          label='Description'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          color='secondary'
          style={{ margin: '10px' }}
          fullWidth
          id='image'
          name='image'
          label='Image'
          type='url'
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
        <Button
          style={{ margin: '10px' }}
          color='secondary'
          variant='contained'
          fullWidth
          type='submit'
        >
          Add product
        </Button>
        <Button
          style={{ margin: '10px' }}
          color='secondary'
          variant='contained'
          fullWidth
          onClick={() => navigate(-1)}
        >
          Undo
        </Button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  sellProduct,
};

export default connect(null, mapDispatchToProps)(ProductForm);
