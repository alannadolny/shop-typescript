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
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function UserProfile({ user, getUser }: UserProfileProps) {
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openPanel, setOpenPanel] = useState<boolean>(false);

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
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Starred' />
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
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Starred' />
          </List>
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
