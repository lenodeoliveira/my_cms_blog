import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import configData from '../../config';
import { LOGOUT } from '../../store/actions';

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const dispatcher = useDispatch();
    const { isLoggedIn, token } = account;

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token':  token
      }

    const getContents = async () => {
        try {
            
            try {
                await axios.get(`${configData.API_SERVER}validate-token-jwt`, {
                    headers: headers
               })
               .catch(function (error) {
                dispatcher({ type: LOGOUT });
            });
        } catch (err) {
                console.log(err)
                dispatcher({ type: LOGOUT });

            }

        } catch (err) {
            console.log('ERROR', err)
            dispatcher({ type: LOGOUT });
        }
    }

    useEffect(() => {
        getContents()
    }, [])

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
