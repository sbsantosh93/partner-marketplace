// @flow
/* eslint-disable */
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
// import _ from "lodash";
import {  useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth } from "../../contexts/AuthContext";
import { useStyles } from "./loginStyle";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";



const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});
const LoginForm = () => {
  const { currentUser, loginFirebase,setIsAuthenticatedFire,isAuthenticatedFire} = useAuth();
  // const [profession, setProfession] = useState(null);
  const [disabledLoginBtn, setDisabledLoginBtn] = useState(false)
  const dispatch = useDispatch()
  const history=useHistory()
  const classes=useStyles()
  const domain = process.env.NODE_ENV === 'development' ? 'localhost' : '.mudey.pt'
  const getProfessions = gql`
    query {
      getProfessions {
        professions
      }
    }
  `;
  const { data } = useQuery(getProfessions, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data != undefined || data != null) {
      let results = data.getProfessions.professions;
      let profession = [];
      for (let i = 0; i < results.length; i++) {
        let obj = {};
        obj.value = results[i];
        obj.label = results[i];
        profession.push(obj);
      }
      // setProfession(profession);
    }

  }, [data]);
  //   const companyId = Cookies.get('MUDEY_company', { domain: domain }) || 'Mudey'
  //   const managerId = Cookies.get('MUDEY_manager', { domain: domain }) || ''

  const LOGIN_USER = gql`
    query userLogin(
      $companyId: String
      $managerId: String
      $consents: UserConsentsInput
    ) {
      userLogin(
        input: {
          companyId: $companyId
          managerId: $managerId
          consents: $consents
        }
      ) {
        uuid
        firstName
        lastName
        email
        companyId
        managerId
      }
    }
  `;

  const companyId = Cookies.get('MUDEY_company', { domain: domain }) || 'Mudey'
  const managerId = Cookies.get('MUDEY_manager', { domain: domain }) || ''

  
  // const { data } = client.query({
  //   query: LOGIN_USER,
  //   fetchPolicy: 'no-cache',
  //   variables: {
  //     companyId: companyId,
  //     managerId: managerId
  //   }
  // })

  const { LoginData} = useQuery(LOGIN_USER, {
    fetchPolicy: "no-cache",
    variables: {
      companyId: companyId,
      managerId: managerId
    }

  });
  // console.log(LoginData)

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        setDisabledLoginBtn(true)
        let email = values.email;
        let password = values.password;
      
        loginFirebase(email, password)
          .then((user) => {
          
         
              const token = user?.user?.stsTokenManager?.accessToken
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
      
          
      
      
              // Cookies.set(
              //   'MUDEY_name',
              //   user.user.displayName,
              //   { domain: domain },
              //   { expires: 1 },
              //   { sameSite: 'strict' },
              //   { secure: true }
              // )
              // Cookies.set(
              //   'MUDEY_company_handler',
              //   data.userLogin.companyId,
              //   { domain: domain },
              //   { expires: 1 },
              //   { sameSite: 'strict' },
              //   { secure: true }
              // )
              // Cookies.set(
              //   'MUDEY_manager_handler',
              //   data.userLogin.managerId,
              //   { domain: domain },
              //   { expires: 1 },
              //   { sameSite: 'strict' },
              //   { secure: true }
              // )
              // console.log(user.user.email)
              dispatch({
                type: 'LOGIN',
                payload: {
                  token,
                  user: {
                    email: user.user.email,
                    name:user.user.displayName,
                    uuid: user.user.uid
                  }
                }
              })
         
            history.push("/carpartner")
          })
          .catch((errror) => console.log(errror));
      }}
    >
      {({ errors, touched, setFieldValue, values,isSubmitting }) => (
        <Form>
            <div className={classes.mainDiv}>

        
          <Card>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Typography>Email</Typography>
                <Field as={TextField} name="email" fullWidth size="small"/>
                <ErrorMessage name="name" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Typography>password</Typography>
                <Field as={TextField} name="password" fullWidth size="small"/>
                <ErrorMessage name="password" component="div" />
              </Grid>
              <Button type="submit" variant="contained" disabled={disabledLoginBtn} >
                Submit
              </Button>
            </Grid>
            </CardContent>
          </Card>
          </div>
          {/* {errors && _.isString(errors) && touched && _.isArray(touched) && (
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
              </div> */}
      
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
