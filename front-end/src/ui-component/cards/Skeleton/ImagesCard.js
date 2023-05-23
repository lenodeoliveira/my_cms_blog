import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Skeleton } from '@material-ui/core';

// style constant
const useStyles = makeStyles({
    cardHeading: {
        marginRight: '1%',
        marginTop: '10px',
        marginBottom: '10px',
        padding: '10px', 
        borderRadius: '5%',
        width: '100%', 
        height: 650, 
        gridTemplateColumns: 'repeat(4, 1fr) !important'
    },
    cardFlex: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardFlexInternal: {
        display: 'flex',
    }
});

//-----------------------|| SKELETON CONTENTS CARD ||-----------------------//

const ImagesCard = () => {
    const classes = useStyles();
    return (
        <Card style={{marginLeft: '-20px'}}>
        <CardContent>
            <Grid item className={classes.cardFlex}>
                     <Skeleton variant="rect" className={classes.cardHeading}  width={'3%'} height={30} /> 
                     <Grid item className={classes.cardFlexInternal}>
                        <Skeleton variant="rect" className={classes.cardHeading}  width={30} height={30} /> 
                        <Skeleton variant="rect" className={classes.cardHeading}  width={30} height={30} /> 
                     </Grid>
            </Grid>
            <Grid container>
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
                <Skeleton variant="rect" className={classes.cardHeading}  width={'24%'} height={300} />
            </Grid>
        </CardContent>
    </Card>
    );
};

export default ImagesCard;
