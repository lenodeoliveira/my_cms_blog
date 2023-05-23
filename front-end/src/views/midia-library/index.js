import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'
// material-ui
import { TablePagination, Checkbox, ImageList, ImageListItem } from '@material-ui/core';
import Actions from '../../ui-component/Actions/Actions'
import EmptyTableMessage from '../../ui-component/empty/EmptyTableMessage'
import configData from '../../config';
import axios from 'axios';
import SkeletonImagesCard from '../../ui-component/cards/Skeleton/ImagesCard';
// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import FormUploadFiles from './FormUploadFiles';

const useStyles = makeStyles((theme) => ({
    linkContent: {
        textDecoration: "none",
        color: theme.palette.primary.main,
    },
    checkbox: {
        position: 'absolute',
        top: '0%',
        zIndex: 1,
        color: '#2196f3',
    }
}));

const MediaLibrary = () => {
    const history = useHistory()
    const classes = useStyles();
    const account = useSelector((state) => state.account);
    const [allImages, setAllImages] = useState({ rows: [], count: 0 })
    const [pageInfo, setPageInfo] = useState({ page: 0, limit: 10 })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selecteds, setSelecteds] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const getImages = async () => {
        try {
            
            try {
               const { data } = await axios.get(`${configData.API_SERVER}upload/files?page=${pageInfo.page}&limit=${pageInfo.limit}`)
               .catch(function (error) {
                setError(error.response.data.error)
            });

               setAllImages(data)
               setLoading(false)
            } catch (err) {
                console.log(err)
                setError(err)
                setLoading(false)
            }

        } catch (err) {
            console.log('ERROR', err)
            setError(err)
        }
    }

    useEffect(() => {
        getImages()
    }, [pageInfo, openDialog])

    
    const selectAll = ({ target }) => {
        target.checked ? setSelecteds([...allImages.rows]) : setSelecteds([])
    }

    const unSelect = ({ target }, row) => {
        setSelecteds(target.checked ? selecteds.concat(row) : selecteds.filter(item => item !== row))
    }

    const handleCreate = () => {
       setOpenDialog(true)
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token
    }

    const deleteUsers = async () => {
        try {
            setLoading(true)
            await Promise.all(selecteds.map(image => axios.delete(`${configData.API_SERVER}upload/${image.name}`, {
                headers: headers
           })))
            await getImages()
        } finally {
            setSelecteds([])
            setLoading(false)
        }
    }

    return (
        <MainCard title="Media Library">
            {loading ? (
                <SkeletonImagesCard/>
            ) : ( 
                <>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '101%'}}>
                    <Checkbox onChange={selectAll} />
                    <Actions onCreate={handleCreate}  onDelete={deleteUsers} length={selecteds.length} deleteMessage='Delete images' />
                </div>
                <ImageList sx={{ width: '100%', height: 650, gridTemplateColumns: 'repeat(4, 1fr) !important' }} cols={3} rowHeight={353}>
                        {allImages.rows.map((item) => (
                            <>
                            <ImageListItem  key={item.url}>
                            <div className={classes.checkbox}>
                                <Checkbox checked={selecteds.includes(item)} onChange={e => unSelect(e, item)} />
                            </div>
                            <img style={{ padding: '10px', borderRadius: '5%'}}
                                src={`http://${item.url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.name}
                                loading="lazy"
                            />
                            </ImageListItem>
                            </>
                        ))}
                </ImageList>
                { openDialog ? <FormUploadFiles open={openDialog} setOpenDialog={setOpenDialog} /> : null}
                </>
            )}
        </MainCard>
    );
};

export default MediaLibrary;
