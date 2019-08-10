import React, { Component } from "react";
import { push } from "connected-react-router";
// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getIssuesRequest } from "store/ducks/getIssues";

// Components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Styles
import "./issues.scss";

class Issues extends Component {
  componentDidMount() {
    const { getIssuesRequest } = this.props;
    getIssuesRequest();
  }

  render() {
    const {
      success,
      data: { issues },
      push
    } = this.props;
    return (
      <div className="issues-wrapper">
        <div className="issues-wrapper-nav">
          <h1>Issues</h1>
          <Button color="primary" onClick={() => push(`/projects`)}>
            Go to Projects
          </Button>
        </div>
        <div className="issues">
          {success &&
            issues.map(({ id, subject, author: { name }, project }) => {
              return (
                <Card key={id} className="card-wrapper">
                  <CardHeader
                    title={subject}
                    subheader={project.name}
                    className="issues-title"
                    onClick={() => push(`/issues/${id}`)}
                  />
                  <CardContent>
                    <Typography>{name}</Typography>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getIssues.data,
  loading: state.getIssues.loading,
  success: state.getIssues.success
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getIssuesRequest, push }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues);
