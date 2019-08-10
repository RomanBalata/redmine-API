/* eslint-disable no-undef */
import React, { Component } from "react";

import { Formik } from "formik";
import { TimeSchema, CommentSchema } from "validations/validate";
// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProjectsRequest } from "store/ducks/getProjects";
import { trackTimeRequest } from "store/ducks/trackTime";
import { hidePopUp } from "store/ducks/popUp";
import { push } from "connected-react-router";

// Components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// Styles
import "./project.scss";

class ProjectPage extends Component {
  state = {
    vertical: "top",
    horizontal: "center",
    comments: []
  };

  componentDidMount() {
    const { getProjectsRequest } = this.props;
    getProjectsRequest();
    this.getComments();
  }

  getComments = () => {
    const comments = sessionStorage.getItem("comments") || [];
    this.setState({
      comments: JSON.parse(comments)
    });
  };

  setComments = ({ values: { comment }, id, actions: { resetForm } }) => {
    let projectComments = JSON.parse(sessionStorage.getItem("comments")) || []; // null exception
    projectComments = [
      ...projectComments,
      {
        id,
        comment
      }
    ];
    sessionStorage.setItem("comments", JSON.stringify(projectComments));
    this.setState({
      comments: projectComments
    });
    resetForm();
  };

  showComments = id => {
    const { comments } = this.state;
    const comment = comments;
    const filteredComments = comment.filter(el => el.id === id);
    if (filteredComments.length > 0) {
      return filteredComments.map(el => (
        <Typography key={Math.random()} color="textSecondary">
          {el.comment}
        </Typography>
      ));
    }
    return (
      <Typography key={Math.random()} color="textSecondary">
        No comment
      </Typography>
    );
  };

  render() {
    const { horizontal, vertical } = this.state;
    const {
      success,
      data: { projects },
      trackTimeRequest,
      hidePopUp,
      show,
      showMessageText,
      push
    } = this.props;

    return (
      <div className="project-wrapper">
        <h1>Projects</h1>
        <div className="project">
          {success &&
            projects.map(({ id, name, description }) => {
              return (
                <Card key={id} className="card-wrapper">
                  <CardHeader
                    title={name}
                    onClick={() => push("/issues")}
                    className="projectTitle"
                  />
                  <Divider variant="middle" />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      Description:
                    </Typography>
                    <Typography component="p">
                      {/[A-Za-z0-9]/g.test(description)
                        ? description
                        : "No description"}
                    </Typography>

                    <Typography variant="h6" component="h3">
                      Comments:
                    </Typography>

                    {this.showComments(id)}
                  </CardContent>
                  <Divider variant="middle" />
                  <CardActions>
                    <Formik
                      initialValues={{
                        time: 0
                      }}
                      validationSchema={TimeSchema}
                      onSubmit={(values, actions) =>
                        trackTimeRequest({ values, id, actions })
                      }
                    >
                      {({
                        values,
                        errors,
                        setFieldTouched,
                        touched,
                        isValid,
                        handleChange,
                        handleSubmit
                      }) => (
                        <form noValidate className="submitForm">
                          <TextField
                            value={values.time}
                            onChange={handleChange("time")}
                            onBlur={() => setFieldTouched("time")}
                            error={touched.time && !!errors.time}
                            helperText={touched.time && errors.time}
                            required
                            name="time"
                            type="number"
                            placeholder="Enter hours"
                          />
                          <Button
                            disabled={!isValid}
                            onClick={handleSubmit}
                            type="submit"
                            color="primary"
                          >
                            Submit Hours
                          </Button>
                        </form>
                      )}
                    </Formik>
                    <Formik
                      initialValues={{
                        comment: ""
                      }}
                      validationSchema={CommentSchema}
                      onSubmit={(values, actions) =>
                        this.setComments({ values, id, actions })
                      }
                    >
                      {({
                        values,
                        errors,
                        setFieldTouched,
                        touched,
                        isValid,
                        handleChange,
                        handleSubmit
                      }) => (
                        <form noValidate className="submitForm">
                          <TextField
                            value={values.comment}
                            onChange={handleChange("comment")}
                            onBlur={() => setFieldTouched("comment")}
                            error={touched.comment && !!errors.comment}
                            helperText={touched.comment && errors.comment}
                            required
                            name="comment"
                            type="text"
                            placeholder="Enter comment"
                          />
                          <Button
                            disabled={!isValid}
                            onClick={handleSubmit}
                            type="submit"
                            color="primary"
                          >
                            Submit Comment
                          </Button>
                        </form>
                      )}
                    </Formik>
                  </CardActions>
                </Card>
              );
            })}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={show}
            onClose={hidePopUp}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{showMessageText}</span>}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getProjects.data,
  loading: state.getProjects.loading,
  success: state.getProjects.success,
  errors: state.getProjects.errors,
  show: state.popUp.show,
  showMessageText: state.popUp.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getProjectsRequest, trackTimeRequest, hidePopUp, push },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage);
