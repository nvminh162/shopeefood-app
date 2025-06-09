import * as Yup from "yup";

const AuthSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .required("Full name is required"),
    
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
    
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),
});

// Schema Login
export const LoginSchema = AuthSchema.pick(['email', 'password']);

// Schema Register
export const RegisterSchema = AuthSchema;
