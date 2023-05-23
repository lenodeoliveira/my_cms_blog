import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import GuestGuard from './../utils/route-guard/GuestGuard';
import MinimalLayout from './../layout/MinimalLayout';
import NavMotion from './../layout/NavMotion';
import Loadable from '../ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../views/pages/authentication/register')));
const ForgotPassword = Loadable(lazy(() => import('../views/pages/authentication/forgot-password/')));
const ResetPassword = Loadable(lazy(() => import('../views/pages/authentication/reset-password/')));

//-----------------------|| AUTH ROUTING ||-----------------------//

const LoginRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/login', '/register', '/forgot-password/', '/reset-password/']}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <NavMotion>
                        <GuestGuard>
                            <Route path="/login" component={AuthLogin} />
                            <Route path="/register" component={AuthRegister} />
                            <Route path="/forgot-password/" component={ForgotPassword} />
                            <Route path="/reset-password/" component={ResetPassword} />
                        </GuestGuard>
                    </NavMotion>
                </Switch>
            </MinimalLayout>
        </Route>
    );
};
export default LoginRoutes;
