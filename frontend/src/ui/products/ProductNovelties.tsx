import {
  Container,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
} from '@mui/material';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/products/selector';
import { getProductList } from '../../ducks/products/operation';
import { RootReducers } from '../../ducks/store';
import { ProductsProps } from '../interfaces';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';

function ProductNovelties({ products, getProductList }: ProductsProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isEmpty(products)) getProductList();
  }, []);

  return (
    <Container>
      <Typography sx={{ margin: '10px' }} variant='h4' color='secondary'>
        New products
      </Typography>
      <List
        sx={{
          width: 1000,
          bgcolor: 'background.paper',
          marginTop: '10px',
        }}
      >
        {products.length >= 1 ? (
          <ListItem
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(`/details/${products[products.length - 1]._id}`)
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Filter1Icon />
              </Avatar>
            </ListItemAvatar>
            <img
              style={{ maxWidth: '400px' }}
              src={products[products.length - 1].image}
              alt={'error'}
              loading='lazy'
            />
            <ListItemText
              sx={{ width: '800px' }}
              primary={products[products.length - 1].name}
              secondary={products[products.length - 1].description}
            />
          </ListItem>
        ) : (
          ''
        )}
        {products.length >= 2 ? (
          <ListItem
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(`/details/${products[products.length - 2]._id}`)
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Filter2Icon />
              </Avatar>
            </ListItemAvatar>
            <img
              style={{ maxWidth: '400px' }}
              src={products[products.length - 2].image}
              alt={'error'}
              loading='lazy'
            />
            <ListItemText
              sx={{ width: '800px' }}
              primary={products[products.length - 2].name}
              secondary={products[products.length - 2].description}
            />{' '}
          </ListItem>
        ) : (
          ''
        )}
        {products.length >= 3 ? (
          <ListItem
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(`/details/${products[products.length - 3]._id}`)
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Filter3Icon />
              </Avatar>
            </ListItemAvatar>
            <img
              style={{ maxWidth: '400px' }}
              src={products[products.length - 3].image}
              alt={'error'}
              loading='lazy'
            />
            <ListItemText
              sx={{ width: '800px' }}
              primary={products[products.length - 3].name}
              secondary={products[products.length - 3].description}
            />{' '}
          </ListItem>
        ) : (
          ''
        )}
      </List>
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
