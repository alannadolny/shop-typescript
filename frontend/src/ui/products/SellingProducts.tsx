import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import { connect } from 'react-redux';
import { RootReducers } from '../../ducks/store';
import { SellingProductProps } from '../interfaces';
import { getUser } from '../../ducks/users/operations';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../ducks/products/operation';

function SellingProducts({
  user,
  getUser,
  deleteProduct,
}: SellingProductProps) {
  const navigate = useNavigate();

  return (
    <Container sx={{ display: 'block' }}>
      <Box>Current selling products:</Box>

      {user.selling &&
        user.selling.map((product) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                display: 'block',
                margin: '10px',
              }}
              key={product._id}
            >
              <CardActionArea>
                <CardMedia
                  onClick={() => navigate(`/details/${product._id}`)}
                  component='img'
                  height='200'
                  image={product.image}
                  alt='error'
                />
                <CardContent
                  onClick={() => navigate(`/details/${product._id}`)}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography gutterBottom variant='h5' component='div'>
                      {product.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='h6'
                      component='div'
                      color='text.secondary'
                    >
                      {product.price}$
                    </Typography>
                  </Box>
                  <Typography
                    noWrap
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      p: 1,
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button
                onClick={() => {
                  deleteProduct(product._id);
                }}
                color='secondary'
                size='small'
                sx={{ postion: 'relative', left: '10px' }}
              >
                Delete
              </Button>
            </Card>
          );
        })}
    </Container>
  );
}

const mapStateToProps = (state: RootReducers) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  getUser,
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(SellingProducts);
