import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductAction() {
  const navigate = useNavigate();

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant='contained' color='secondary' sx={{ margin: '10px' }}>
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

export default ProductAction;
