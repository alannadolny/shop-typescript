import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListSubheader,
} from '@mui/material';
import { connect } from 'react-redux';
import { getCarts } from '../../ducks/carts/selector';
import { RootReducers } from '../../ducks/store';
import { getCartList } from '../../ducks/carts/operation';
import { getProductList } from '../../ducks/products/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { Cart as CartInterface, CartProps, Product } from '../interfaces';
import { getProducts } from '../../ducks/products/selector';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Cart({ carts, getCartList, getProductList, products }: CartProps) {
  useEffect(() => {
    if (_.isEmpty(carts)) {
      getCartList();
      getProductList();
    }
  }, []);

  return (
    <Container>
      <Typography variant='h2' color='secondary'>
        Your carts:
      </Typography>
      {carts.map((cart: CartInterface) => (
        <List
          key={cart._id}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            border: '1px solid grey',
            margin: '10px',
            opacity: cart.active ? '1' : '0.5',
          }}
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              {cart.active ? 'Current cart' : 'Previous cart'}
            </ListSubheader>
          }
        >
          {cart.products.map((productId: string) => {
            const product: Product | undefined = products.find(
              (el: Product) => el._id === productId
            );
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ArrowForwardIosIcon fontSize='large' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product?.name}
                  secondary={product?.price + '$'}
                />
              </ListItem>
            );
          })}
        </List>
      ))}
    </Container>
  );
}

const mapStateToProps = (state: RootReducers) => {
  return {
    carts: getCarts(state),
    products: getProducts(state),
  };
};

const mapDispatchToProps = {
  getCartList,
  getProductList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
