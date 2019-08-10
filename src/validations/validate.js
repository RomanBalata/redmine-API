import * as Yup from "yup";

export const TimeSchema = Yup.object().shape({
  time: Yup.number()
    .moreThan(1, "Too Short!")
    .positive()
    .integer("must be a number")
    .required("required")
});

export const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});
