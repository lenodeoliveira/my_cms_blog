import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const Contents = Loadable(lazy(() => import('../views/contents')));
const Users = Loadable(lazy(() => import('../views/users-by-admin')));
const ContentsForm = Loadable(lazy(() => import('../views/contents/ContentsForm')));
const UsersForm = Loadable(lazy(() => import('../views/users-by-admin/UsersForm')));
const ContentsEditForm = Loadable(lazy(() => import('../views/contents/ContentsEditForm')));
const UsersEditForm = Loadable(lazy(() => import('../views/users-by-admin/UsersEditForm')));
const MediaLibrary = Loadable(lazy(() => import('../views/midia-library/')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',
                '/contents',
                '/users',
                '/admin/contents',
                '/admin/contents/:contentId',
                '/admin/user/edit/:userId',
                '/media-library',
                '/admin/users',
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard"exact component={DashboardDefault} />
                        <Route path="/contents" exact component={Contents} />
                        <Route path="/users" exact component={Users} />
                        <Route path="/admin/contents" exact component={ContentsForm} />
                        <Route path="/admin/users" exact component={UsersForm} />
                        <Route path="/admin/contents/edit/:contentId" exact component={ContentsEditForm} />
                        <Route path="/admin/user/edit/:userId" exact component={UsersEditForm} />
                        <Route path="/media-library" exact component={MediaLibrary} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
