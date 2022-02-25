import {
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  ListSubheader,
} from '@mui/material';
import { RootReducers } from '../../ducks/store';
import { getProducts } from '../../ducks/products/selector';
import { getProductList } from '../../ducks/products/operation';
import { Product, ProductsProps } from '../interfaces';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function ProductCategories({ products, getProductList }: ProductsProps) {
  useEffect(() => {
    if (_.isEmpty(products)) getProductList();
  }, []);

  const [category, setCategory] = useState<string>('');

  const navigate = useNavigate();

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    margin: '10px',
  };

  return (
    <Container sx={{ display: 'inline-flex' }}>
      <List
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Choose category:
          </ListSubheader>
        }
        sx={style}
        component='nav'
        aria-label='mailbox folders'
      >
        {_.uniq(products.map((el) => el.category)).map((el) => {
          return (
            <div>
              <ListItem button onClick={() => setCategory(el)}>
                <ListItemText primary={el} />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
      <Box>
        <Typography variant='h5' color='secondary'>
          {category === '' ? '' : `category:  ${category}`}
        </Typography>
        {products &&
          products
            .filter((el) => el.category === category)
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
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
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
      </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);
