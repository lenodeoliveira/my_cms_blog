import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Skeleton } from '@material-ui/core';
import { gridSpacing } from '../../../store/constant';
// style constant
const useStyles = makeStyles({
    cardHeading: {
        marginRight: '8px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    cardFlex: {
        display: 'flex', 
        alignItems: 'center'
    }
});

//-----------------------|| SKELETON CONTENTS CARD ||-----------------------//

const UsersEditCard = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                      <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} md={8}>
                                            <Grid item>
                                                <Skeleton variant="rect"  className={classes.cardHeading} height={60} />
                                            </Grid>
                                            <Grid item>
                                                <Skeleton variant="rect" className={classes.cardHeading} height={60} />
                                            </Grid>
                                            <Grid item>
                                                <Skeleton variant="rect" className={classes.cardHeading} height={60} />
                                            </Grid>
                                            <Grid item>
                                                <Skeleton variant="rect" width={100} className={classes.cardHeading} height={60} />
                                            </Grid>


                                            <Grid container justifyContent="flex-start">
                                                <Grid item>
                                                    <Skeleton variant="rect" width={150} height={50} />
                                                </Grid>
                                                <Grid style={{marginLeft: '1%'}} item>
                                                    <Skeleton variant="rect" width={150} height={50} />
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Grid item>
                                                <Skeleton variant="rect" className={classes.cardHeading} height={60} />
                                            </Grid>
                                            <Grid item>
                                                <Skeleton variant="rect" className={classes.cardHeading} height={60} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                        </Grid>
            </CardContent>
        </Card>
    );
};

export default UsersEditCard;


                      