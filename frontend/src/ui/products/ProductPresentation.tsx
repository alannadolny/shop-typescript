import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../ducks/products/selector';
import { RootReducers } from '../../ducks/store';
import BadgeIcon from '@mui/icons-material/Badge';
import CategoryIcon from '@mui/icons-material/Category';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DescriptionIcon from '@mui/icons-material/Description';

function ProductPresentation() {
  const { productId } = useParams<string>();
  const product = useSelector((state: RootReducers) =>
    getProductById(state, productId)
  );

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        marginTop: '20px',
      }}
    >
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <BadgeIcon fontSize='large' />
        </ListItemAvatar>
        <ListItemText
          primary='Name'
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {product?.name}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <CategoryIcon fontSize='large' />
        </ListItemAvatar>
        <ListItemText
          primary='Category'
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {product?.category}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <LocalAtmIcon fontSize='large' />
        </ListItemAvatar>
        <ListItemText
          primary='Price'
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {product?.price}$
              </Typography>
            </>
          }
        />
      </ListItem>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <DescriptionIcon fontSize='large' />
        </ListItemAvatar>
        <ListItemText
          primary='Description'
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {product?.description}
              </Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
}

export default ProductPresentation;
