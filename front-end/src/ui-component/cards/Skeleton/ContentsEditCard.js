import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Skeleton } from '@material-ui/core';

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

const ContentsEditCard = () => {
    const classes = useStyles();
    return (
        <Card style={{marginLeft: '-20px'}}>
        <CardContent>
            <Grid container direction="column">
                <Grid item className={classes.cardFlex}>
                     <Skeleton variant="rect" className={classes.cardHeading}  width={'35%'} height={50} /> 
                     <Skeleton variant="rect" className={classes.cardHeading}  width={'15%'} height={50} /> 
                     <Skeleton variant="rect" className={classes.cardHeading}  width={'5%'} height={40} /> 
                </Grid>
                    <Skeleton variant="rect" className={classes.cardHeading}  width={'75%'} height={480} />
                <Grid item className={classes.cardFlex} style={{marginTop: '12px'}}>
                     <Skeleton variant="rect" className={classes.cardHeading}  width={'15%'} height={43} /> 
                     <Skeleton variant="rect" className={classes.cardHeading}  width={'15%'} height={43} /> 
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    );
};

export default ContentsEditCard;
