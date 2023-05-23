import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'
// material-ui
import { TablePagination, Checkbox } from '@material-ui/core';
import Actions from '../../ui-component/Actions/Actions'
import EmptyTableMessage from '../../ui-component/empty/EmptyTableMessage'
import configData from '../../config';
import axios from 'axios';
import SkeletonContentsCard from '../../ui-component/cards/Skeleton/ContentsCard';
// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    linkContent: {
        textDecoration: "none",
        color: theme.palette.primary.main,
    },
}));

const Contents = () => {
    const history = useHistory()
    const classes = useStyles();
    const account = useSelector((state) => state.account);
    const [allContents, setAllContents] = useState({ rows: [], count: 0 })
    const [selecteds, setSelecteds] = useState([])
    const [pageInfo, setPageInfo] = useState({ page: 0, limit: 10 })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token
    }

    const getContents = async () => {
        try {
            
            try {
               const { data } = await axios.get(`${configData.API_SERVER}contents-by-admin?page=${pageInfo.page}&limit=${pageInfo.limit}`, {
                    headers: headers
               })
               .catch(function (error) {
                setError(error.response.data.error)
            });

               setAllContents(data)
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
        getContents()
    }, [pageInfo])

    const handleCreate = () => {
        history.push('/admin/contents')
    }

    const deleteUsers = async () => {
        try {
            setLoading(true)
            await Promise.all(selecteds.map(content => axios.delete(`${configData.API_SERVER}contents/${content.id}`, {
                headers: headers
           })))
            await getContents()
        } finally {
            setSelecteds([])
            setLoading(false)
        }
    }

    const selectAll = ({ target }) => {
        target.checked ? setSelecteds([...allContents.rows]) : setSelecteds([])
    }

    const unSelect = ({ target }, row) => {
        setSelecteds(target.checked ? selecteds.concat(row) : selecteds.filter(item => item !== row))
    }

    const handleSanitizeHtml = (str) => {
        return str.replace( /(<([^>]+)>)/ig, '')
    }

    return (
        <MainCard title="Contents">
            {loading ? (
                <SkeletonContentsCard />
            ) : (
                <React.Fragment>
                    <Actions onCreate={handleCreate}  onDelete={deleteUsers} length={selecteds.length} deleteMessage='DELETE CONTENTS' />
                    <div className="row container h-50 mg-60 overflow-auto">

                    <table className="table table-vertical-center">
                    <thead>
                                <tr>
                                    <th  style={{ paddingLeft: '0px' }} className="primary p-0"> <Checkbox onChange={selectAll} /> </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary pl-3 text-left font-weight-bold text-nobreak"> Título </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Descrição </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Publicado </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Data de criação </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Data de atualização </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allContents.rows.map((row, index) => 
                                    <tr key={row.id}>
                                        <td className="pl-0 py-2">
                                                <div>
                                                    <Checkbox checked={selecteds.includes(row)} onChange={e => unSelect(e, row)} />
                                                </div>
                                            </td>
                                        <td className="text-left p-0 pl-0 py-2">
                                            <NavLink className={classes.linkContent}  to={`/admin/contents/edit/${row.id}`}>
                                                <span className='menu-text'>{row.title}</span>
                                            </NavLink>
                                        </td>
                                        <td className="text-left p-0 pl-0 py-2">
                                            <span>{
                                            `${handleSanitizeHtml(row.body.slice(0, 20))}...`}</span>
                                        </td>
                                        <td className="text-left p-0 pl-0 py-2">
                                            <>{row.published ? <span style={{fontWeight: 'bolder', color: '#2196f3'}}>Publicado</span> : <span style={{fontWeight: 'bolder', color: '#f44336'}}>Rascunho</span> }</>
                                        </td>
                                        <td className="text-left p-0 pl-0 py-2">
                                            <span>{ row.createAt ? moment(row.createAt).format('LL'): ''}</span>
                                        </td>
                                        <td className="text-left p-0 pl-0 py-2">
                                            <span>{ row.updateAt ? moment(row.updateAt).format('LL'): ''}</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                    </table>
                    <EmptyTableMessage length={allContents.rows.length} resource='CONTENTS' />
                    </div>
                    <div className="row d-flex justify-content-end">
                        <TablePagination
                            component="div"
                            count={allContents.count}
                            page={pageInfo.page}
                            onPageChange={(event, newPage) => {
                                setPageInfo({
                                    ...pageInfo,
                                    page: newPage
                                })
                            }}
                            rowsPerPage={pageInfo.limit}
                            onRowsPerPageChange={(event) => {
                                let newRowsPerPage = parseInt(event.target.value, 10)
                                setPageInfo({
                                    ...pageInfo,
                                    limit: newRowsPerPage,
                                    page: 0
                                })
                            }}
                        />
                    </div> 
                </React.Fragment>
            )}
        </MainCard>
    );
};

export default Contents;