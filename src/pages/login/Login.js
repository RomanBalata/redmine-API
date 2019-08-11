import React from "react";
import { Formik } from "formik";
// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginRequest } from "store/ducks/login";
// Component
import { LoginSchema } from "utils/validate";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./login.scss";

const Login = ({ loginRequest, loading }) => {
  return (
    <div className="login-wrapper">
      <h1>Sign In</h1>

      <Formik
        initialValues={{
          login: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => loginRequest({ values, actions })}
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
          <form noValidate>
            <TextField
              value={values.login}
              onChange={handleChange("login")}
              onBlur={() => setFieldTouched("login")}
              error={touched.login && !!errors.login}
              helperText={touched.login && errors.login}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              value={values.password}
              onChange={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={!isValid || loading}
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = state => ({
  success: state.login.success,
  loading: state.login.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginRequest }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
