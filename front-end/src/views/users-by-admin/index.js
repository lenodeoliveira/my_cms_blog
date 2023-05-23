import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment'

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { NavLink, useHistory } from 'react-router-dom';
import configData from '../../config';
import EmptyTableMessage from '../../ui-component/empty/EmptyTableMessage';
import { TablePagination, Checkbox } from '@material-ui/core';
import SkeletonContentsCard from '../../ui-component/cards/Skeleton/ContentsCard';
import { makeStyles } from '@material-ui/styles';
import Actions from '../../ui-component/Actions/Actions'

//==============================|| SAMPLE PAGE ||==============================//

const useStyles = makeStyles((theme) => ({
    linkContent: {
        textDecoration: "none",
        color: theme.palette.primary.main,
    }
}));

const Users = () => {
    const history = useHistory()
    const classes = useStyles();
    const account = useSelector((state) => state.account);
    const [users, setUsers] = React.useState({ rows: [], count: 0 })
    const [pageInfo, setPageInfo] = React.useState({ page: 0, limit: 10 })
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token
    }

    const getUsers = async () => {
        try {
            
            try {
               const { data } = await axios.get(`${configData.API_SERVER}register/auth/users/?page=${pageInfo.page}&limit=${pageInfo.limit}`, {
                    headers: headers
               })
               .catch(function (error) {
                setError(error.response.data.error)
            });

               setUsers(data)
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

    React.useEffect(() => {
        getUsers()
    }, [pageInfo])


    const handleCreate = () => {
        history.push('/admin/users')
    }

    return (
        <MainCard title="Users">
               {loading ? (
                <SkeletonContentsCard />
            ) : (
                <React.Fragment>
                    <div style={{marginLeft: '1%'}} className="row container h-50 mg-60 ml-2 overflow-auto">
                        <Actions onCreate={handleCreate}  showCancel={false} />
                            <table className="table table-vertical-center">
                                <thead>
                                    <th  style={{ paddingLeft: '0px' }} className="primary pl-3 text-left font-weight-bold text-nobreak"> Nome </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> E-mail </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Permissão </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Status </th>
                                    <th  style={{ paddingLeft: '0px' }} className="primary text-left font-weight-bold text-nobreak"> Data de criação </th>
                                </thead>
                                <tbody>
                                    {users.rows.map((row, index) => 
                                        <tr key={row.id}>
                                            <td className="text-left p-0 pl-0 py-2">
                                                <NavLink className={classes.linkContent}  to={`/admin/user/edit/${row.id}`}>
                                                    <span className='menu-text'>{row.name}</span>
                                                </NavLink>
                                            </td>
                                            
                                            <td className="text-left p-0 pl-0 py-2">
                                                <span className='menu-text'>{row.email}</span>
                                            </td>
                                            <td className="text-left p-0 pl-0 py-2">
                                                <span style={{fontWeight: 'bolder'}} className='menu-text'>{row.role}</span>
                                            </td>
                                            <td className="text-left p-0 pl-0 py-2">
                                                <>{row.status ? <span style={{fontWeight: 'bolder', color: '#2196f3'}}>Ativo</span> : <span style={{fontWeight: 'bolder', color: '#f44336'}}>Desativado</span> }</>
                                            </td>
                                            <td className="text-left p-0 pl-0 py-2">
                                            <span>{ row.createdAt ? moment(row.createdAt).format('LL'): ''}</span>
                                        </td>
                                        </tr>
                                    )}
                                </tbody>
                        </table>
                    <EmptyTableMessage length={users.rows.length} resource='USERS' />
                    </div>
                    <div className="row d-flex justify-content-end">
                        <TablePagination
                            component="div"
                            count={users.count}
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

export default Users;
