import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Grid, Typography } from '@material-ui/core';

// project imports
import SkeletonTotalGrowthBarChart from '../../../ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';

// chart data
import { createChart } from './chart-data/pie-chart-contents';

import configData from '../../../config';
import axios from 'axios';


//-----------------------|| DASHBOARD DEFAULT - TOTAL CONTENTS BY AUTHOR ||-----------------------//

const TotalContentsByAuthorsPieChart = ({ isLoading }) => {

    const account = useSelector((state) => state.account);
    const [error, setError] = React.useState(null)

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': account.token
    }

    async function getContentsByAuthors() {
        try {
            const { data } = await axios.get(`${configData.API_SERVER}contents/dashboard/count-by-authors`, {
                headers: headers
           })
            if (data) {
                createChart(data)
            }
        } catch(error) {
            setError(error)
        }
    }

    React.useEffect(() => {
        getContentsByAuthors()
    }, [isLoading]);     

    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="flex-start">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h3">Total content by author</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <div style={{ height: '550px' }} id="chartdiv"/>
                            </div>

                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

TotalContentsByAuthorsPieChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalContentsByAuthorsPieChart;
