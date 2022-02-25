import {
  Container,
  Autocomplete,
  TextField,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/products/selector';
import { RootReducers } from '../../ducks/store';
import { Product, ProductsProps } from '../interfaces';
import { getProductList } from '../../ducks/products/operation';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';

function ProductSearch({ products, getProductList }: ProductsProps) {
  const navigate = useNavigate();
  const [input, changeInput] = useState<string>('');
  useEffect(() => {
    if (_.isEmpty(products)) getProductList();
  }, []);

  return (
    <Container>
      <Autocomplete
        value={input}
        sx={{ margin: '10px' }}
        freeSolo
        id='free-solo-2-demo'
        disableClearable
        options={_.uniq(products.map((product: Product) => product.name))}
        renderInput={(params) => (
          <TextField
            {...params}
            label='type product name'
            onChange={(e) => changeInput(e.target.value)}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      {products &&
        products
          .filter((el) => new RegExp(input, 'i').test(el.name))
          .map((product: Product) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);
