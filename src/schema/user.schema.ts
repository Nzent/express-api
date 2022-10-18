import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 characters minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password only contain latin characters"),
    confirmPassword: string().oneOf([ref("password"), null], "Password not match" ),
    email: string().required("Email is required").email("Must be valid email"),
  }),
});
