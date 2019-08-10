import React, { Component } from "react";
import { goBack } from "connected-react-router";
// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSingleIssuesRequest } from "store/ducks/getSingleIssues";

// Components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// Styles
import "./singleIssue.scss";

class SingleIssues extends Component {
  componentDidMount() {
    const {
      getSingleIssuesRequest,
      match: {
        params: { id }
      }
    } = this.props;
    getSingleIssuesRequest({ id });
  }

  getInitialPerson = name => {
    const matches = name.match(/\b(\w)/g);
    return matches.join("");
  };

  render() {
    const {
      success,
      data: { issues },
      goBack
    } = this.props;
    return (
      <div>
        <div>
          {success &&
            issues.map(
              ({
                id,
                subject,
                author: { name },
                project: { name: projectName },
                status: { name: statusName },
                description
              }) => {
                return (
                  <Card key={id} className="single-issue-wrapper">
                    <CardHeader
                      avatar={<Avatar>{this.getInitialPerson(name)}</Avatar>}
                      title={subject}
                      subheader={projectName}
                    />
                    <CardContent>
                      <Typography align="right">
                        Status: {statusName}
                      </Typography>
                      <Typography paragraph>{description}</Typography>
                    </CardContent>
                  </Card>
                );
              }
            )}
          <Button color="primary" onClick={() => goBack()}>
            Go to Issues
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getSingleIssues.data,
  loading: state.getSingleIssues.loading,
  success: state.getSingleIssues.success,
  errors: state.getSingleIssues.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSingleIssuesRequest, goBack }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleIssues);
