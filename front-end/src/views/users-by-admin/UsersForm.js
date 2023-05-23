import React, { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import { Button, Grid, InputLabel, Switch, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import configData from '../../config';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorDialog from '../../ui-component/error-message/ErrorDialog'
import { SelectForm } from '../../ui-component/select/SelectForm';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Loader from '../../ui-component/Loader';

let loading = false

const initialValues = {
    name: null,
	email: null,
    password: null,
    status: false,
    role: 'user'
}

const validationSchema = Yup.object({
    name: Yup
      .string('Enter your name')
      .required('Name is required'),
    email: Yup
      .string('Enter your email')
      .email("Invalid email format")
      .required('Email is required'),
    password: Yup
      .string('Enter your password')
      .required('Email is password'),
    role: Yup.string().required("Role is required!")
  });

const UsersForm = ({ history }) => {
    const account = useSelector((state) => state.account);
    const [users, setUsers] = useState(initialValues)
    const [statusContent, setStatusContent] = useState(false)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token,
    }

    const formik = useFormik({
        initialValues: users,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            saveUser(values)
        },
      });
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changeStatusUser = (event) => setStatusContent(event.target.checked)

    const saveUser = async (values) => {
        try {
            loading = true
          try {
              await axios.post(`${configData.API_SERVER}register/auth/users`, values,{
                  headers: headers,
              })
              loading = false
              history.push('/users')
             .catch(function (error) {
              setOpen(true)
              setError(error.response.data.error)
              loading = false
          });
          } catch (error) {
              setOpen(true)
              setError(error.response.data.error)
              loading = false
          }

      } catch (err) {
          console.log('ERROR', err)
          setError(err)
          loading = false
      }
  } 
  
  const handleClose = () => setOpen(false)

    return (
        <MainCard title='Create user'>
         <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
            <Grid item xs={12} md={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-start flex-column">
                                <div className='input-group mb-3'>
                                    <InputLabel style={{marginBottom: '10px'}} htmlFor="outlined-adornment-name">Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-name"
                                        type="text"
                                        value={formik.values.name}
                                        name="name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        fullWidth={true}
                                        label="Name"
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        
                                    />
                                </div>
                                <div className='input-group mb-3'>
                                    <InputLabel style={{marginBottom: '10px'}} htmlFor="outlined-adornment-email">Email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type="email"
                                        value={formik.values.email}
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        fullWidth={true}
                                        label="Email Address"
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        
                                    />
                                </div>

                                <div className='input-group mb-3'>
                                  <InputLabel style={{marginBottom: '10px'}} htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        name="password"
                                        onBlur={formik.handleBlur}
                                        fullWidth={true}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        
                                    />
                                </div>

                                <SelectForm label="Permissão" 
                                    validation={formik} field='role' options={[
                                        { id: 'admin', name: 'admin' },
                                        { id: 'user', name: 'user' }
                                    ]} />

                                <div className='d-flex align-items-center pr-4 mt-3 w-40'>
                                <Switch
                                        {...formik.getFieldProps('status')}
                                        checked={formik.values.status}
                                        color='primary'
                                        onClick={changeStatusUser}
                                    />  <>{statusContent ? <span>Activate </span>: <span>Deactivate</span>}</>
                                </div>
                            </div>

                        <div className='d-block col-12'>
                                <div className="align-right">
                                    <Button onClick={() => history.goBack()} style={{marginRight: '10px', width: '15%'}} className='mt-4' color="error" variant="contained">
                                            CANCEL
                                    </Button>
                                    <Button style={{width: '15%'}} className='mt-4 ml-1' color="primary" variant="contained" type="submit">
                                            SAVE
                                    </Button>
                                </div>
                            </div>
                    </form>
                    </Grid>
                { error ? <ErrorDialog error={error} onClose={handleClose} open={open} /> : null }
            </Grid>
            </Grid>
            { loading ? <Loader/>: null }
        </MainCard>
    );
};

export default UsersForm;
