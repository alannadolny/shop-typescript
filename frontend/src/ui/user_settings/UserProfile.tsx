import { Container, Typography, ListItemButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootReducers } from '../../ducks/store';
import { getUser } from '../../ducks/users/operations';
import { UserProfileProps } from '../interfaces';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import SellingProducts from '../products/SellingProducts';
import * as _ from 'lodash';
import SalesInformation from '../products/SalesInformation';

function UserProfile({ user, getUser }: UserProfileProps) {
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickInfo = () => {
    setOpenInfo(!openInfo);
  };

  const handleClickPanel = () => {
    setOpenPanel(!openPanel);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Typography variant='h4' color='secondary'>
        {user.login}
      </Typography>
      <Typography variant='h6' color='secondary'>
        {user.email}
      </Typography>
      <List>
        <ListItemButton onClick={handleClickInfo}>
          <ListItemIcon>
            <InfoIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Information about your products' />
          {openInfo ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openInfo} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <SalesInformation />
          </List>
        </Collapse>
      </List>

      <List>
        <ListItemButton onClick={handleClickPanel}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Manage your listings' />
          {openPanel ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPanel} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton onClick={() => navigate('/add/product')}>
              <AddShoppingCartIcon
                fontSize='medium'
                sx={{ margin: '10px', color: 'grey' }}
              />
              Sell your product
            </ListItemButton>
          </List>
          {!_.isEmpty(user.selling) ? <SellingProducts /> : ''}
        </Collapse>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
