import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import axios from 'axios';
import { useState } from 'react';
//import VehicleForm from 'extraUI/VehicleForm';
import ContactsSidebarContent from './ContactsSidebarContent';
import { setContactsSearchText } from './store/contactsSlice';

const onFormSubmitHandler = () => {};

function ContactsHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const mainTheme = useSelector(selectMainTheme);

  const [isVehicleForm, setIsVehicleForm] = useState(false);

  function onAddVehicleHandler() {
    setIsVehicleForm(true);
  }

  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <Hidden lgUp>
          <IconButton
            onClick={ev => {
              props.pageLayout.current.toggleLeftSidebar();
            }}
            aria-label="open left sidebar"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        <div className="flex items-center">
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            account_box
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            Vehicles
          </Typography>
        </div>

        {/* <VehicleForm onClick={props.handleOpen} /> */}

        {/* <Button variant="outlined" onClick={onAddVehicleHandler}>
          +ADD
        </Button> */}
      </div>

      <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
        <ContactsSidebarContent />
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search for anything"
              className="flex flex-1 px-16"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                'aria-label': 'Search'
              }}
              onChange={ev => dispatch(setContactsSearchText(ev))}
            />
          </Paper>
        </ThemeProvider>
      </div>

      {/* {isVehicleForm && <VehicleForm onFormSubmit={onFormSubmitHandler} setIsVehicleForm={setIsVehicleForm} />} */}
    </div>
  );
}

export default ContactsHeader;
