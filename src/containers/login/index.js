import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import _ from "lodash";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth } from "../../contexts/AuthContext";
import { useStyles } from "./loginStyle";
import { theme } from "../../theme";



const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});
const LoginForm = () => {
  const { currentUser, loginFirebase,setIsAuthenticatedFire,isAuthenticatedFire} = useAuth();
  const [profession, setProfession] = useState(null);
  const classes=useStyles()
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
      setProfession(profession);
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

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        let email = values.email;
        let password = values.password;
        loginFirebase(email, password)
          .then((e) => {
            console.log("before ",isAuthenticatedFire)
            setIsAuthenticatedFire(true)
            console.log("after ",isAuthenticatedFire)
          })
          .catch((errror) => console.log(errror));
      }}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
            <div className={classes.mainDiv}>

        
          <Card>
          <CardContent>
           {currentUser && <h1>{`the current user is ${currentUser.displayName}`}</h1>}
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
              <Button type="submit" variant="contained" sx={{backgroundColor:'primary.magic'}}>
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
          {currentUser && <pre> {JSON.stringify(currentUser, null, 2)}</pre>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
