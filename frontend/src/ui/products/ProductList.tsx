import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Box,
} from '@mui/material';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/products/selector';
import { RootReducers } from '../../ducks/store';
import { getProductList } from '../../ducks/products/operation';
import { ProductsProps, Product } from '../interfaces';
import { useEffect } from 'react';
import * as _ from 'lodash';

function ProductList({ products, getProductList }: ProductsProps) {
  useEffect(() => {
    if (_.isEmpty(products)) getProductList();
  }, []);

  return (
    <Container>
      <Typography variant='h2' color='secondary'>
        Products
      </Typography>{' '}
      {products &&
        products.map((product: Product) => {
          return (
            <Card
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
        })}{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
