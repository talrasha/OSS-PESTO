import React, { useState, useEffect } from "react";
import ProjectDataService from "../services/project.service";
// import IssueDataService from "../services/issue.service";
import Pagination from "@material-ui/lab/Pagination";
import {
  Grid,
  Paper,
  TextField,
  Tabs,
  Tab,
  AppBar,
  makeStyles,
} from "@material-ui/core";
import DataTable from "./DataTable";
import Header from "./Header/index.js";
import { TABDATA as tabData } from "./TabData";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      justifyContent: "center",
      display: "flex",
    },
  },
  pagination: {
    alignItems: "center",
    justify: "center",
  },
  appBarStyle: {
    backgroundColor: "#77a6f7",
    color: "white",
    fontWeight: "bolder",
    boxShadow: "0px 0px 0px 0px",
  },
}));

export default function ProjectList() {
  const classes = useStyles();
  const [projects, setProjectsData] = useState([]);
  // const [issues, setIssuesData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [tabValue, setTabValue] = useState(0);

  const valuesArray = Object.values(tabData[0]);
  const pageSizes = [10, 20, 50, 100];
  const tabNames = tabData.map((item) => Object.keys(item));

  useEffect(() => {
    const retrieveProjects = () => {
      const params = getRequestParams(searchTitle, page, pageSize);
      ProjectDataService.getAll(params)
        .then((response) => {
          const { projects, totalPages } = response.data;
          setProjectsData(projects);
          setCount(totalPages);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveProjects();
  }, [page, pageSize, searchTitle]);

  // get all Issues Data
  /*
  useEffect(() => {
    const retrieveIssues = () => {
      const params = getRequestParams(searchTitle, page, pageSize);
      IssueDataService.getAll(params)
        .then((response) => {
          const { issues, totalPages } = response.data;
          setIssuesData(issues);
          console.log(issues);
          setCount(totalPages);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveIssues();
  }, [page, pageSize, searchTitle]);
  */

  const handleTabs = (e, value) => {
    setTabValue(value);
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["full_name"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div className="root">
      <Grid container direction="row">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Paper className="paperStyle">
            <AppBar position="static" className={classes.appBarStyle}>
              <Tabs value={tabValue} onChange={handleTabs}>
                {tabNames[0].map((data, index) => (
                  <Tab key={index} label={data} />
                ))}
              </Tabs>
            </AppBar>

            {tabNames[0].map((data, tabPanelIndex) => (
              <TabPanel
                key={tabPanelIndex}
                value={tabValue}
                index={tabPanelIndex++}
              >
                <div className="tabPanelItem">
                  <TextField
                    id="outlined-search"
                    fullWidth
                    label="Search by Project Name"
                    type="search"
                    variant="outlined"
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                    className="textFieldStyle"
                  />
                  <DataTable
                    columns={valuesArray[tabPanelIndex - 1]}
                    data={projects}
                    compareButton={true}
                  />
                </div>
              </TabPanel>
            ))}

            <div style={{ textAlign: "center" }}>
              {"Items per Page: "}
              <select
                onChange={handlePageSizeChange}
                value={pageSize}
                className="select-style"
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <div className={classes.root}>
                <Pagination
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  className={classes.pagination}
                  onChange={handlePageChange}
                  color="secondary"
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <>{value === index && <div> {children}</div>}</>;
}
