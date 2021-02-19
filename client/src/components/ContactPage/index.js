import React from 'react'
import {Grid, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    headingStyle: {
      color: 'purple',
      padding: '50px 0'
    },
  });

function ContactPage() {
    const classes = useStyles();
 
    return (
        <Grid container direction="column">
            <Grid item>  
                <Typography variant="h2"  align="center" className={classes.headingStyle}>
                    Welcome to Contact Page
                </Typography>
            </Grid>
           
        </Grid>
       
    )

}

export default (ContactPage)
