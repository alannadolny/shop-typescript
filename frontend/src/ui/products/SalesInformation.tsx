import {
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { RootReducers } from '../../ducks/store';
import { getUser } from '../../ducks/users/operations';
import { connect } from 'react-redux';
import { UserProfileProps } from '../interfaces';
import { useNavigate } from 'react-router-dom';

function SalesInformation({ user, getUser }: UserProfileProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        <ListItemButton>
          <ListItemIcon>
            <StorefrontIcon fontSize='medium' />
          </ListItemIcon>
          <ListItemText
            primary='Sold products'
            secondary={
              <List>
                {user.sold &&
                  user.sold.map((el) => {
                    return (
                      <ListItemText
                        sx={{
                          ':hover': {
                            color: 'purple',
                          },
                        }}
                        key={el._id}
                        onClick={() => navigate(`/details/${el._id}`)}
                      >
                        <FiberManualRecordIcon
                          fontSize='small'
                          sx={{ position: 'relative', top: '4px' }}
                        />
                        {el.name}
                      </ListItemText>
                    );
                  })}
              </List>
            }
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon fontSize='medium' />
          </ListItemIcon>
          <ListItemText
            primary='Bought products'
            secondary={
              <List>
                {user.bought &&
                  user.bought.map((el) => {
                    return (
                      <ListItemText
                        sx={{
                          ':hover': {
                            color: 'purple',
                          },
                        }}
                        key={el._id}
                        onClick={() => navigate(`/details/${el._id}`)}
                      >
                        <FiberManualRecordIcon
                          fontSize='small'
                          sx={{ position: 'relative', top: '4px' }}
                        />
                        {el.name}
                      </ListItemText>
                    );
                  })}
              </List>
            }
          />
        </ListItemButton>
      </List>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesInformation);
