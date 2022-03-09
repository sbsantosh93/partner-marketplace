// @flow
/* eslint-disable */
import { Form, Formik ,Field,ErrorMessage} from "formik";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useStyles } from "./registerStyle";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import _ from 'lodash'
import Cookies from 'js-cookie'

const RegisterPage = () => {
  const classes = useStyles();
  const [disableRegisterButton, setdisableRegisterButton] = useState(false);
  const { register } = useAuth();
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string()
            .min(6, "Too Short!")
            .max(70, "Too Long!")
            .required("Required"),
        })}
        onSubmit={(values) => {
          setdisableRegisterButton(true);
          let email = values.email;
          let password = values.password;
          register(email, password)
            .then(({ user }) => {
              console.log(user);
              const token=user?.stsTokenManager?.accessToken
              Cookies.set('MUDEY_token', token, { domain: domain }, { expires: 1 }, { sameSite: 'strict' }, { secure: true })
              Cookies.set(
                'MUDEY_uuid',
                user.uid,
                { domain: domain },
                { expires: 1 },
                { sameSite: 'strict' },
                { secure: true }
              )
              Cookies.set(
                'MUDEY_email',
                user.email,
                { domain: domain },
                { expires: 1 },
                { sameSite: 'strict' },
                { secure: true }
              )
              dispatch({
                type: 'REGISTER',
                payload: {
                  token,
                  user: {
                    email: user.email,
                    name:user.displayName,
                    uuid: user.uid
                  }
                }
              })
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
         {({ errors, touched, setFieldValue, values,isSubmitting }) => (  
             <Form>
        <Card>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Typography>Email</Typography>
                <Field as={TextField} name="email" fullWidth size="small" />
                <ErrorMessage name="name" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Typography>password</Typography>
                <Field as={TextField} name="password" fullWidth size="small" />
                <ErrorMessage name="password" component="div" />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                disabled={disableRegisterButton}
              >
                Register
              </Button>
            </Grid>
          </CardContent>
        </Card>
          {errors && _.isString(errors) && touched && _.isArray(touched) && (
                <div className="field-error">{errors}</div>
              )}
              <div className={'row'}>
                <div className={'col-12'}>
                  <code>
                    <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                  </code>
                </div>
                <div className={'col-12'}>
                  <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                </div>
                <div className={'col-12'}>
                  <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
                </div>
              </div>
        </Form>
         )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
