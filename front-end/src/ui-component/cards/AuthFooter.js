import React from 'react';

// material-ui
import { Link, Typography, Stack } from '@material-ui/core';

const AuthFooter = () => {

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
                &copy; Brave Ag
            </Typography>
        </Stack>
    );
};

export default AuthFooter;
