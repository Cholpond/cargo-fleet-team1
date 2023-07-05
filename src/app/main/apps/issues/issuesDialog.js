import {
    Dialog,
    DialogContent,
    makeStyles,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem
  } from '@material-ui/core';
  import AppBar from '@material-ui/core/AppBar';
  import TextField from '@material-ui/core/TextField';
  import Avatar from '@material-ui/core/Avatar';
  import Toolbar from '@material-ui/core/Toolbar';
  import Typography from '@material-ui/core/Typography';
  import { useDispatch, useSelector } from 'react-redux';
  import * as yup from 'yup';
  import { Controller, useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { useCallback, useEffect } from 'react';
  import FuseUtils from '@fuse/utils/FuseUtils';
  
  import _ from 'lodash';
  import { addNewissue, closeNewissueDialog, updateIssue } from './store/issuesSlice';
  
  const defaultValues = {
    vehicle_id: '',
    title: '',
    description: '',
    priority: '',
    due_date: ''
  };
  const schema = yup.object().shape({
    vehicle_id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    priority: yup.string().required(),
    due_date: yup.string().required()
  });
  
  const useStyles = makeStyles(() => ({
    inputInformation: {},
  
    textfield: {
      width: '100%',
      margin: '7px 0'
    },
    content: {
      width: '400px',
      overflow: 'scroll',
      height: '700px'
    },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  }));
  
  function IssuesDialog() {
    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema)
    });
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const issueDialog = useSelector(store => store.listissuesApp.issues.issueDialog);
  
    const { isValid, dirtyFields, errors } = formState;
  
    const initDialog = useCallback(() => {
      if (issueDialog?.type === 'edit' && issueDialog?.data) {
        reset({ ...issueDialog?.data });
      }
      if (issueDialog?.type === 'new') {
        reset({
          ...defaultValues,
          ...issueDialog?.data,
          id: FuseUtils.generateGUID()
        });
      }
    }, [issueDialog?.data, issueDialog?.type, reset]);
  
    function closeDialog() {
      dispatch(closeNewissueDialog());
    }
  
    useEffect(() => {
      if (issueDialog?.props.open) {
        initDialog();
      }
    }, [issueDialog?.props.open, initDialog]);
  
    function submit(data) {
      if (issueDialog?.type === 'new') {
        dispatch(addNewissue(data));
      } else {
        dispatch(updateIssue({ ...issueDialog?.data, ...data }));
      }
      closeDialog();
    }
  
    const vehicles = useSelector(state => state.listissuesApp.issues.entities);
    const vehiclesCopy = Object.values(vehicles);
    console.log(vehiclesCopy);
  
    return (
      <Dialog {...issueDialog?.props} onClose={closeDialog}>
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              new
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="contact avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            />
          </div>
        </AppBar>
  
        <form noValidate className="flex flex-col md:overflow-hidden" onSubmit={handleSubmit(submit)}>
          <DialogContent className={classes.content}>
            <Controller
              control={control}
              name="vehicle_id"
              render={({ field }) => (
                <FormControl sx={{ m: 1, minWidth: 340 }} variant="outlined">
                  <InputLabel id="demo-simple-select-helper-label">Vehicle</InputLabel>
                  <Select
                    label="Vehicle"
                    id="vehicle_id"
                    name="vehicle_id"
                    className="mb-24"
                    style={{ width: '340px' }}
                    {...field}
                    labelId="demo-simple-select-helper-label"
                  >
                    {vehiclesCopy.map(vehicle => (
                      <MenuItem
                        value={vehicle.vehicle_id}
                      >{`Make: ${vehicle.vehicle.brand} | Model: ${vehicle.vehicle.brand} | Plate: ${vehicle.vehicle.plate_number}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
  
            {/* <Controller
              control={control}
              name="vehicle_id"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Vehicle" id="vehicle_id" variant="outlined" fullWidth />
              )}
            /> */}
  
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Title" id="title" variant="outlined" fullWidth />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Description"
                  id="description"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
  
            <Controller
              control={control}
              name="due_date"
              render={({ field }) => (
                <TextField {...field} className="mb-24" id="due_date" variant="outlined" fullWidth type="date" />
              )}
            />
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <FormControl sx={{ m: 1, minWidth: 340 }} variant="outlined">
                  <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
                  <Select
                    label="Priority"
                    id="priority"
                    name="priority"
                    className="mb-24"
                    style={{ width: '340px' }}
                    {...field}
                    labelId="demo-simple-select-helper-label"
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
  
            {/* 
  
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="email" id="email" variant="outlined" fullWidth />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField {...field} className="mb-24" id="description" variant="outlined" fullWidth type="date" />
              )}
            />
  
            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="phone_number"
                  id="phone_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
  
            <Controller
              control={control}
              name="address1"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="address1" id="address1" variant="outlined" fullWidth />
              )}
            />
  
            <Controller
              control={control}
              name="address2"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="address2" id="address2" variant="outlined" fullWidth />
              )}
            />
  
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="city" id="city" variant="outlined" fullWidth />
              )}
            />
  
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="state" id="state" variant="outlined" fullWidth />
              )}
            />
  
            <Controller
              control={control}
              name="postal_code"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="postal_code"
                  id="postal_code"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
  
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="country" id="country" variant="outlined" fullWidth />
              )}
            />
  
            <Controller
              control={control}
              name="license_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="license_number"
                  id="license_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
  

            
  
            <Controller
              control={control}
              name="license_state"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="license_state"
                  id="license_state"
                  variant="outlined"
                  fullWidth
                />
              )}
            /> */}
            <div className={classes.button}>
              <Button variant="contained" color="primary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Submit
              </Button>
  
              <Button variant="contained" color="secondary" onClick={closeDialog}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    );
  }
  
  export default IssuesDialog;