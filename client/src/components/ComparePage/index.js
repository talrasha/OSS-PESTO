import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import DataTable from "../DataTable/index";
const useStyles = makeStyles({
  headingStyle: {
    color: "purple",
    padding: "50px 0",
    textAlign: "center",
    fontSize: "3rem",
  },
});

function ComparePage(props) {
  const classes = useStyles();

  const tableData = JSON.parse(localStorage.getItem("selectedRowData"));
  const columnData = props.location && props.location.columns;

  if (tableData === null) {
    return (
      <h1 className={classes.headingStyle}>
        No projects were selected to compare
      </h1>
    );
  }

  return (
    <Grid item xs={12}>
      <Paper className="paperStyle">
        <DataTable
          columns={columnData}
          data={tableData}
          compareButton={false}
        />
        {localStorage.removeItem("selectedRowData")}
      </Paper>
    </Grid>
  );
}

export default ComparePage;
