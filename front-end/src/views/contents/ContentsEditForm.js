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
import * as Yup from "yup";
import moment from 'moment'
import ErrorDialog from '../../ui-component/error-message/ErrorDialog';
import SkeletonContentsEditCard from '../../ui-component/cards/Skeleton/ContentsEditCard';


const initialValues = {
    title: "",
	slug: "",
    body: "",
}

const ContentsEditForm = ({ history }) => {
    const account = useSelector((state) => state.account);
    const [contents, setContents] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(true)
    const [contentError, setContentError] = useState(false)
    const [slugError, setSlugError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const editorRef = React.useRef(null);
    const { contentId } = useParams()

    const [published, setIsPublished] = useState(false);
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token,
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedContent = {
            title: contents.title,
            slug: contents.slug,
            body: editorRef.current.getContent(),
            published: published
        }
        try {
            if(editorRef.current.getContent().length === 0) {
                handleContentBody()
            } else if (updatedContent.slug.length === 0) {
                setSlugError(true)

            } else if (updatedContent.title.length === 0) {
                setTitleError(true)
            
            } else {
                updateContent(updatedContent)
            }
        } finally {
            setIsLoading(false)
        }

      };

    const handleContentBody = () => setContentError(true)

    const changeEditorText = (content) => {
        if(content.length > 1 ) {
            setContentError(false)
        }
    }

    const updateContent = async (values) => {

          try {
            
            try {
                await axios.put(`${configData.API_SERVER}contents/${contentId}`, values,{
                    headers: headers,
                })
                history.push('/contents')
               .catch(function (error) {
                setOpen(true)
                setError(error.response.data.error)
            });

                setIsLoading(false)
                await getContents()
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
    
    const getContents = async () => {
        try {
            
            try {
               const { data } = await axios.get(`${configData.API_SERVER}contents-by-admin/${contentId}`, {
                    headers: headers
               })
               .catch(function (error) {
            });

               setContents(data)
               setIsPublished(data.published)
               setIsLoading(false)
            } catch (err) {
                console.log(err)
            }

        } catch (err) {
            console.log('ERROR', err)
        }
    }

    useEffect(() => {
        getContents()
    }, [])

    const changeStatusContent = () => setIsPublished(!published)

    const onInputChange = (e) => {
        setContents({ ...contents, [e.target.name]: e.target.value });
    };
    
    const handleClose = () => setOpen(false)
 
    const { title, slug, body } = contents

    return (
        <MainCard title={`${contentId ? 'Edit Content' : 'Create Content'}`}>
            {isLoading ? (
                <SkeletonContentsEditCard/>
            ) : ( 
                    <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} md={8}>
                                        <form onSubmit={(e) => onSubmit(e)}>
                                            <div className="d-flex justify-content-start">
                                                    <div className='pr-4 mr-5 w-50' style={{marginRight: '3%'}}>
                                                    <InputLabel htmlFor= 'title'> Title </InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            id="title"
                                                            name="title"
                                                            type="title"
                                                            margin="normal"
                                                            value={title}
                                                            onChange={(e) => onInputChange(e)}
                                                            />
                                                        { titleError ? <span style={{ color: '#f44336', fontSize: '0.75rem' }}>Title is required </span> : null}
                                                    </div>
                                                    <div className='pr-4 mr-5 w-40'>
                                                    <InputLabel htmlFor= 'slug'> Slug </InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            id="slug"
                                                            name="slug"
                                                            type="slug"
                                                            margin="normal"
                                                            value={slug}
                                                            onChange={(e) => onInputChange(e)}
                                                            />
                                                        { slugError ? <span style={{ color: '#f44336', fontSize: '0.75rem' }}>Slug is required </span> : null}
                                                    </div>

                                                    <div className='d-flex align-items-center pr-4 mt-3 w-40'>
                                                    <Switch
                                                            checked={published}
                                                            color='primary'
                                                            onChange={changeStatusContent}
                                                        />  <>{published ? <span>Published </span>: <span>Draft</span>}</>
                                                    </div>
                                                </div>
                                            <div style={{height: '500px'}}>
                                            <Editor
                                                apiKey={configData.API_KEY_EDITOR}
                                                onInit={(evt, editor) => (editorRef.current = editor)}
                                                initialValue={body}
                                                init={init}
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
                                        <Grid item xs={12} md={3}>
                                        <div className='d-flex justify-content-center' style={{ marginTop: '22%'}}>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Autor: { contents.author }</li>
                                                <li class="list-group-item">Criado em: { contents.createAt ? moment(contents.createAt).format('LL'): ''}</li>
                                                <li class="list-group-item">Última atualização: { contents.updateAt ? moment(contents.updateAt).format('LL'): ''}</li>
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

export default ContentsEditForm;
