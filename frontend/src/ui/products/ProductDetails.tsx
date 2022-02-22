import { Container, Box } from '@mui/material';
import { useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../ducks/products/selector';
import { RootReducers } from '../../ducks/store';
import { getProductList } from '../../ducks/products/operation';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { GetProductListProps } from '../interfaces';
import ProductPresentation from './ProductPresentation';

function ProductDetails({ getProductList }: GetProductListProps) {
  const { productId } = useParams<string>();
  const product = useSelector((state: RootReducers) =>
    getProductById(state, productId)
  );

  useEffect(() => {
    if (_.isEmpty(product)) getProductList();
  }, []);

  return (
    <Container sx={{ display: 'flex', marginTop: '10px' }}>
      <Box>
        <img src={product?.image} alt='' />
      </Box>
      <ProductPresentation />
    </Container>
  );
}

const mapDispatchToProps = {
  getProductList,
};

export default connect(null, mapDispatchToProps)(ProductDetails);
