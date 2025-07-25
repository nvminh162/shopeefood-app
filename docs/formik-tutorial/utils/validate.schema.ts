 import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Password not allow empty!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});
