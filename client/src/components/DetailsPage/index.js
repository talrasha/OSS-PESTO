import React, { Component } from "react";
import ProjectDataService from "../../services/project.service";
import { Grid, Paper } from "@material-ui/core";
import "./style.css";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.state = {
      project: [],
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  retrieveProjects() {
    const { handle } = this.props.match.params;
    ProjectDataService.get(handle)
      .then((response) => {
        this.setState({
          project: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { project } = this.state;

    return (
      <div className="root">
        <Grid container direction="row">
          <Grid item xs={12}>
            <Paper className="paperStyle">
              <div style={{ overflowX: "auto" }}>
                <table className="table-style">
                  <tbody>
                    {Object.entries(project).map((t, k) => (
                      <tr key={k}>
                        <td className="list-title">{t[0]}</td>
                        <td className="list-desc">{t[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DetailsPage;
