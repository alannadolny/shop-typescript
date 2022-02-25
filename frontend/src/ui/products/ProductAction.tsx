import { Container, Button, Collapse } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../ducks/carts/operation';
import { AddToCartInterface } from '../interfaces';
import { isLogged } from '../../ducks/users/selector';
import { RootReducers } from '../../ducks/store';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function ProductAction({ addToCart, logged }: AddToCartInterface) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { productId } = useParams<string>();
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      {logged ? (
        <Button
          variant='contained'
          color='secondary'
          sx={{ margin: '10px' }}
          onClick={() => {
            addToCart(productId);
            setOpen(true);
          }}
        >
          Add to cart
        </Button>
      ) : (
        ''
      )}
      <Button
        onClick={() => navigate(-1)}
        variant='contained'
        color='secondary'
        sx={{ margin: '10px' }}
      >
        Go back
      </Button>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          The product has been added to the cart
        </Alert>
      </Collapse>
    </Container>
  );
}

const mapStateToProps = (state: RootReducers) => {
  return {
    logged: isLogged(state),
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAction);
