import React from 'react';

import { styled } from '@mui/material/styles';

import T from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from '@mui/material/ClickAwayListener';

import CakeIcon from '@mui/icons-material/Cake';
import UpdateIcon from '@mui/icons-material/Update';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SearchIcon from '@mui/icons-material/Search';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import IPCWalletUI from '../lib/IPCWalletUI';

import IPCInstance from '../lib/IPCInstance';
import config from '../config';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const IPCContext = IPCInstance.IPCContext;

function IPCSprite(props) {

  const style = {
    container: {
      display: 'inline-block',
      marginBottom: '16px',
      width: '250px',
      height: '250px',
      backgroundColor: '#aaaabb',
      borderRadius: '100%',
      textAlign: 'center'
    },

    image: {
      marginTop: '18px',
      width: '80%',
      imageRendering: 'pixelated'
    },

    image_type: {
      position: 'relative',
      bottom: '16px',
      left: '4px'
    }
  };

  const Container = styled('div')(style.container);
  const Image = styled('img')(style.image);
  const ImageType = styled('img')(style.image_type);

  const image_filename = config.public_url + "sprites/" + props.filename;
  const image_type_filename = config.public_url + "assets/8-bit.png";

  return (
    <Container>
      <Image src={image_filename} />
      <ImageType src={image_type_filename} />
    </Container>
  );
}

function IPCEconomics(props)
{
  const style = {
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '16px auto',
      width: '100%',
      maxWidth: '500px',
      borderRadius: '4px',
      boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), ' + 
                 '0px 8px 10px 1px rgb(0 0 0 / 14%), ' + 
                 '0px 3px 14px 2px rgb(0 0 0 / 12%)',
      backgroundColor: '#444455',
      textAlign: 'center',
      color: '#ffffff',

      '@media (min-width: 800px)': {
         margin: '16px 0px',       
      }
    },

    column: {
      display: 'flex',
      flexDirection: 'column',

      padding: '12px 8px',
      width: '33%',
      border: '1px solid #aaaabb',
      borderWidth: '0px 1px 0px 0px'
    },

    tcolumn: { border: '0px none transparent' },
    caption: { fontSize: '14px' },

    value: {
      marginBottom: '8px',
      fontSize: '21px'
    }
  };

  const Table = styled('div')(style.table);
  const Column = styled('div')(style.column);
  const TColumn = styled('div')(style.column, style.tcolumn);

  return (
    <Table>
      <Column>
        <T sx={style.value}>{ props.price }</T>
        <T sx={style.caption}>Claim Price</T>
      </Column>
      <Column>
        <T sx={style.value}>{ props.gold  }</T>
        <T sx={style.caption}>Gold</T>
      </Column>
      <TColumn>
        <T sx={style.value}>{ props.xp }</T>
        <T sx={style.caption}>XP</T>
      </TColumn>
    </Table>
  );
}

function handleCopyToClipboard(ipc) {

  let wallet_address = "";

  if (ipc != null)
    wallet_address = ipc.owner;
  else return;

  let value = "";
  if (!navigator.clipboard) {

    let textin = document.getElementById('clipboard_input');

    textin.type = "text";
    textin.value = wallet_address;
    textin.focus();
    textin.select();

    document.execCommand('copy');
    textin.type = "hidden";
  }
  else
    navigator.clipboard.writeText(wallet_address);
}

function ClipboardInput(props) {
  return (<input id="clipboard_input" className={props.className} type="hidden" />);
}

function getSearchWalletListener(navigate, wallet_address) {
  return (() => {
    window.scrollTo(0,0);
    navigate(config.PUBLIC_ROOT + wallet_address);
  });
}

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function IPCProfile(props) {

  const instance = React.useContext(IPCContext);;

  let ipc = instance.ipc;
  let label_ipc = instance.label_ipc;

  const [tipOpen, setTipOpen] = React.useState(false);

  const handleTipOpen = () => {
    setTipOpen(true);
    handleCopyToClipboard(ipc);

  };

  const handleTipClose = () => {
    setTipOpen(false);
  };

  //AI S1 button

  const [popupOpen, setPopupOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]); //to be removed

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = (value) => {
    setPopupOpen(false);
    setSelectedValue(value);
  };


  const style = {
    hidden_clipboard_input: {
      position: 'absolute',
      top: '-20px',
      left: '-20px',
      width: '20px',
      height: '20px'
    },

    container: {
      display: 'block',
      flexDirection: 'row',
      margin: '0px auto',
      padding: '0px 16px 16px 16px',
      textAlign: 'center',

      '@media (min-width: 800px)': {
        display: 'flex',
        textAlign: 'left'
      },
    },

    columnLeft: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 0px 0px 0px',
      width: 'auto',
      '@media (min-width: 800px)': { width: '50%' }

    },

    columnRight: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
 
      paddingLeft: '16px',
      width: 'auto',
      '@media (min-width: 800px)': { width: '50%' }
    },

    caption: {
      marginBottom: '8px',
      fontFamily: 'poppins-semibold',
      fontSize: '28px'
    },

    list: {
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
    },

    list_item: {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    icon: {
      marginRight: '4px',
      verticalAlign: 'sub'
    },

    wallet_icon: {
      marginRight: '4px',
      verticalAlign: 'sub'
    }
  };

  const List = styled('div')(style.list);
  const ListItem = styled('div')(style.list_item);

  const HiddenClipboardInput = styled(ClipboardInput)(style.hidden_clipboard_input);

  return (
    <Container sx={style.container}>
      <HiddenClipboardInput />

      <Box sx={style.columnLeft}>
      <IPCSprite filename={ipc.token_id + ".gif"} />
      <T sx={style.caption}>#{ipc.token_id} - {label_ipc.name}</T>
      </Box>

      <Box sx={style.columnRight}>
      <List>
        <ListItem>
          <CakeIcon fontSize="small" sx={style.icon} />
          Born on {label_ipc.birth}
        </ListItem>
        <ListItem>
          <UpdateIcon fontSize="small" sx={style.icon} />
          Last Updated on {label_ipc.last_updated}
        </ListItem>
      </List>

      <IPCEconomics
        price={label_ipc.price}
        gold={ipc.gold}
        xp={ipc.xp}
      />

      <List>
        <ListItem>
          <AccountBalanceIcon fontSize="small" sx={style.wallet_icon} />
            Wallet Address
        </ListItem>
        <ListItem>{ipc.owner}</ListItem>
      </List>

      <Box>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={getSearchWalletListener(instance.navigate, ipc.owner)}
        sx={{margin: '8px 4px'}}>
        Search Wallet
      </Button>

      <ClickAwayListener onClickAway={ handleTipClose }>
      <Tooltip
        title="Address copied!"
        placement="top"
        open={tipOpen}
        onClose={handleTipClose}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        arrow>

        <Button
          variant="contained"
          endIcon={<ContentPasteIcon />}
          onClick={handleTipOpen}
          sx={{margin: '8px 4px'}}>
          Copy Address to Clipboard
        </Button>

      </Tooltip>
      </ClickAwayListener>

      <Button variant="outlined" onClick={handlePopupOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={popupOpen}
        onClose={handlePopupClose}
      />

      </Box>
    </Box>
    </Container>
  );
} 
