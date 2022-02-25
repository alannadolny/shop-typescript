import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/products/selector';
import { getProductList } from '../../ducks/products/operation';
import { RootReducers } from '../../ducks/store';
import { Product, ProductsProps } from '../interfaces';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function ProductNovelties({ products, getProductList }: ProductsProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isEmpty(products)) getProductList();
  }, []);

  return (
    <Container>
      <Typography variant='h5' color='secondary'>
        Top 5 new products:
      </Typography>
      {products &&
        products.slice(0, 5).map((product: Product) => {
          return (
            <Card
              onClick={() => navigate(`/details/${product._id}`)}
              sx={{
                maxWidth: 345,
                display: 'inline-flex',
                margin: '10px',
              }}
              key={product._id}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='200'
                  image={product.image}
                  alt='error'
                />
                <CardContent>
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
            </Card>
          );
        })}
    </Container>
  );
}

const mapStateToProps = (state: RootReducers) => {
  return {
    products: getProducts(state),
  };
};

const mapDispatchToProps = {
  getProductList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductNovelties);
