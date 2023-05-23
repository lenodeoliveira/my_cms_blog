import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import { Button, Grid, TextField, InputLabel, Switch } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useParams } from "react-router-dom";
import configData from '../../config';
import { init } from '../../utils/editor/init';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import TextFieldComponent from '../../ui-component/Inputs/TextFieldComponent';
import ActionBar from '../../ui-component/Actions/ActionBar';
import ErrorDialog from '../../ui-component/error-message/ErrorDialog'

const initialValues = {
    title: "",
	slug: "",
    body: "",
    published: false
}

const validationSchema = Yup.object({
    title: Yup
      .string('Enter your title')
      .required('Title is required'),
    slug: Yup
      .string('Enter your slug')
      .required('Slug is required'),
  });

const ContentsForm = ({ history }) => {
    const account = useSelector((state) => state.account);
    const [contents, setContents] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(false)
    const editorRef = React.useRef(null);
    const { contentId } = useParams()
    const [statusContent, setStatusContent] = useState(false)
    const [contentError, setContentError] = useState(false)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token,
    }

    const formik = useFormik({
        initialValues: contents,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if(editorRef.current.getContent().length === 0) {
                    handleContentBody()
                } else {
                    saveContent({
                        title: values.title,
                        slug: values.slug,
                        body: editorRef.current.getContent(),
                        published: values.published
                    })
                }
            } finally {
                setIsLoading(false)
            }
        },
      });

    const saveContent = async (values) => {
          try {
            
            try {
                await axios.post(`${configData.API_SERVER}contents`, values,{
                    headers: headers,
                })
                history.push('/contents')
               .catch(function (error) {
                setOpen(true)
                setError(error.response.data.error)
            });

                setIsLoading(false)
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

    const changeStatusContent = (event) => setStatusContent(event.target.checked)

    const handleContentBody = () => setContentError(true)

    const changeEditorText = (content) => {
        if(content.length > 1) {
            setContentError(false)
        }
    }

    const handleClose = () => setOpen(false)

    return (
        <MainCard title={`${contentId ? 'Edit Content' : 'Create Content'}`}>
         <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={9}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-start">
                                <div className='pr-4 mr-5 w-50' style={{marginRight: '3%'}}>
                                  <InputLabel htmlFor= 'title'> title </InputLabel>
                                    <TextField
                                        fullWidth
                                        id="title"
                                        name="title"
                                        type="title"
                                        margin="normal"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        />   
                                </div>
                                <div className='pr-4 mr-5 w-40'>
                                  <InputLabel htmlFor= 'slug'> slug </InputLabel>
                                    <TextField
                                        fullWidth
                                        id="slug"
                                        name="slug"
                                        type="slug"
                                         margin="normal"
                                        value={formik.values.slug}
                                        onChange={formik.handleChange}
                                        error={formik.touched.slug && Boolean(formik.errors.slug)}
                                        helperText={formik.touched.slug && formik.errors.slug}
                                        />
                                </div>

                                <div className='d-flex align-items-center pr-4 mt-3 w-40'>
                                <Switch
                                        {...formik.getFieldProps('published')}
                                        checked={formik.values.published}
                                        color='primary'
                                        onClick={changeStatusContent}
                                    />  <>{statusContent ? <span>Published </span>: <span>Draft</span>}</>
                                </div>
                            </div>
                            <div style={{height: '425px'}}>
                                <Editor
                                    apiKey={configData.API_KEY_EDITOR}
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    init={{init}}
                                    onEditorChange={changeEditorText}
                                />
                            </div>
                        { contentError ? <span style={{ color: '#f44336', fontSize: '0.75rem' }}>Content is required </span> : null}
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
                    <Grid item xs={12} md={2}></Grid>
                </Grid>
            </Grid>
            </Grid>
        </MainCard>
    );
};

export default ContentsForm;
