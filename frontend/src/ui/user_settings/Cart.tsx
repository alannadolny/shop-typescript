import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  ListSubheader,
  ButtonGroup,
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
import DeleteIcon from '@mui/icons-material/Delete';
import {
  deleteFromCart,
  deleteCart,
  buyCart,
} from '../../ducks/carts/operation';

function Cart({
  carts,
  getCartList,
  getProductList,
  products,
  deleteFromCart,
  deleteCart,
  buyCart,
}: CartProps) {
  useEffect(() => {
    getCartList();
    getProductList();
  }, []);

  return (
    <Container>
      <Typography variant='h2' color='secondary'>
        Your carts:
      </Typography>
      {carts.map((cart: CartInterface) => (
        <div
          style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}
          key={cart._id}
        >
          {cart.active ? (
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
              color='secondary'
            >
              <Button onClick={() => buyCart()}>Buy</Button>
              <Button onClick={() => deleteCart()}>Delete cart</Button>
            </ButtonGroup>
          ) : (
            ''
          )}
          <List
            // key={cart._id}
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
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
                <ListItem
                  key={productId}
                  secondaryAction={
                    cart.active ? (
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          deleteFromCart(productId);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      ''
                    )
                  }
                >
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
        </div>
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
  deleteFromCart,
  deleteCart,
  buyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
