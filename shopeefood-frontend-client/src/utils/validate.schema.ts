import * as Yup from "yup";

const Schema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^0[0-9]{9}$/, "Phone number must be 10 digits and start with 0")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),

  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('newPassword')], "Passwords must match"),
});

// Schema Login
export const LoginSchema = Schema.pick(["email", "password"]);

// Schema Register
export const RegisterSchema = Schema.pick(["fullName", "email", "password"]);

// Schema UpdateUser
export const UpdateUserSchema = Schema.pick(["fullName", "email", "phone"]);

// Schema ChangePassword
export const ChangePasswordSchema = Schema.pick(["currentPassword", "newPassword", "confirmPassword"]);