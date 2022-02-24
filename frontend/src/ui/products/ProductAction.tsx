import { Container, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../ducks/carts/operation';
import { AddToCartInterface } from '../interfaces';

function ProductAction({ addToCart }: AddToCartInterface) {
  const navigate = useNavigate();
  const { productId } = useParams<string>();
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      {console.log(productId)}
      <Button
        variant='contained'
        color='secondary'
        sx={{ margin: '10px' }}
        onClick={() => addToCart(productId)}
      >
        Add to cart
      </Button>
      <Button
        onClick={() => navigate(-1)}
        variant='contained'
        color='secondary'
        sx={{ margin: '10px' }}
      >
        Go back
      </Button>
    </Container>
  );
}

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(ProductAction);
