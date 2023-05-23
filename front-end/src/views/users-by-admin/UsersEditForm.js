import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import { Button, Grid, TextField, InputLabel, Switch } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useParams } from "react-router-dom";
import configData from '../../config';
import axios from 'axios';
import * as Yup from "yup";
import ErrorDialog from '../../ui-component/error-message/ErrorDialog';
import { useFormik } from "formik";
import { SelectForm } from '../../ui-component/select/SelectForm';
import moment from 'moment'
import SkeletonUsersEditCard from '../../ui-component/cards/Skeleton/UsersEditCard';

const initialValues = {
    name: '',
    email: '',
    role: '',
}

const validationSchema = Yup.object({
    name: Yup
      .string('Enter your name')
      .required('Name is required'),
    email: Yup
      .string('Enter your email')
      .email("Invalid email format")
      .required('Email is required'),
    role: Yup.string().required("Role is required!")
});


const UsersEditForm = ({ history }) => {
    const account = useSelector((state) => state.account);
    const [user, setUser] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(true)
    const { userId } = useParams()
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const [statusUser, setStatusUser] = useState(false)

    const [opt, setOpt] = useState(null)

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token,
    }
  

    const getUser = async () => {
        try {
            
            try {
               const { data } = await axios.get(`${configData.API_SERVER}register/auth/users/${userId}`, {
                    headers: headers
               })
               .catch(function (error) {
            });
                setUser({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    
                })
               setOpt(data)
               setStatusUser(data.status)
               setIsLoading(false)
            } catch (err) {
                console.log(err)
            }

        } catch (err) {
            console.log('ERROR', err)
        }
    }

    useEffect(() => {
        getUser()
    }, [userId])

    const formik = useFormik({
        initialValues: user,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const userUpdated = Object.assign(values, {status: statusUser});
                updateUser(userUpdated)
            } finally {
            }
        },
      })

    const updateUser = async (values) => {

          try {
            
            try {

                await axios.put(`${configData.API_SERVER}register/auth/users/${userId}`, values,{
                    headers: headers,
                })
                history.push('/users')
               .catch(function (error) {
                setOpen(true)
                setError(error.response.data.error)
            });

                setIsLoading(false)
                await getUser()
            } catch (error) {
                setOpen(true)
                setError(error.response.data.error)
                setIsLoading(false)
            }

        } catch (err) {
            console.log('ERROR', err)
            setError(err)
        }
    }

    const handleClose = () => setOpen(false)

    const changeStatusUser = (event) => {
        setStatusUser(event.target.checked)
    }

    return (
        <MainCard title={'Edit User'}>
            {isLoading ? (
                <SkeletonUsersEditCard/>
            ) : ( 
                <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} md={8}>
                                        <form
                                            onSubmit={formik.handleSubmit}>
                                            <div className="d-flex justify-content-start flex-column">
                                                <div className='input-group mb-3'>
                                                <InputLabel htmlFor= 'Name'> Name </InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        id="name"
                                                        type="name"
                                                        name="name"
                                                        margin="normal"
                                                        value={formik.values.name}
                                                        {...formik.getFieldProps('name')}
                                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                                        helperText={formik.touched.name && formik.errors.name}
                                                        />   
                                                </div>
                                             </div>
                            
                                            <div className='input-group mb-3'>
                                            <InputLabel style={{marginBottom: '10px'}} htmlFor= 'E-mail'> E-mail </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    margin="email"
                                                    value={formik.values.email}
                                                    {...formik.getFieldProps('email')}
                                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                                    helperText={formik.touched.email && formik.errors.email}
                                                    />
                                            </div>

                                            <SelectForm label="Permissão" 
                                                validation={formik} field='role' options={[
                                                    { id: 'admin', name: 'admin' },
                                                    { id: 'user', name: 'user' }
                                                ]} />
                                
                                            <div className='d-flex align-items-center pr-4 mt-3 w-40'>
                                                <Switch
                                                    checked={statusUser}
                                                    color='primary'
                                                    onClick={changeStatusUser}
                                                />  <>{statusUser ? <span>Activate </span>: <span>Deactivate</span>}</>
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
                                        <Grid item xs={12} md={3}>

                                        <div className='d-flex justify-content-center' style={{ marginTop: '6%'}}>
                                            <ul class="list-group list-group-flush">
                                            <li class="list-group-item">Criado em: { opt.createdAt ? moment(opt.createdAt).format('LL'): ''}</li> 
                                            <li class="list-group-item">Última atualização: { opt.createdAt ? moment(opt.createdAt).format('LL'): ''}</li>
                                            </ul> 
                                        </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                        </Grid>
            )}
         
        </MainCard>
    );
};

export default UsersEditForm;



