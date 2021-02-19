import React from "react";
import { Grid, Typography } from "@material-ui/core";

function Footer() {
  return (
    <div>
      <Grid container className="footer" justify="center">
        <Grid item>
          <Typography variant="body2" className="typographyStyle">
            Address part is here
          </Typography>
          <Typography variant="body2" className="typographyStyle">
            &copy; {new Date().getFullYear()} OSS - All rights reserved
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
