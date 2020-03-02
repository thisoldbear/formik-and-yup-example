import * as React from "react";
import { Formik, Field } from 'formik';
import * as Yup from "yup";

// Define a Yup schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
});

// Define some data to validate
// email is not currently valid
const values = {
  firstName: 'jimmy',
  email: 'jimm'
}

// Validate the values against the schema
// independent of a form
SignupSchema
  .validate(values)
  .then((values) => {
    // If all is valid, the valies are returned
    console.log('Valid', values);
  })
  .catch((errors) => {
    // Otherwise we catch and are given the Yup errors object
    console.log(errors)
  });

// Use the SignupSchema to validate form values
export const Form = () => (
  <div>
    <h1>Formik Form</h1>
    <h2>With Yup Validation</h2>
    <Formik
      initialValues={
        {
          firstName: '',
          lastName: '',
          email: '',
        }
      }
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <div>
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            {props.errors.firstName && props.touched.firstName &&
              <p style={{
                color: 'red',
              }}>{props.errors.firstName}</p>
            }
          </div>
          <div>
            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            {props.errors.lastName && props.touched.lastName &&
              <p style={{
                color: 'red',
              }}>{props.errors.lastName}</p>
            }
          </div>
          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
            />
            {props.errors.email && props.touched.email &&
              <p style={{
                color: 'red',
              }}>{props.errors.email}</p>
            }
          </div>
          <button type="submit">
            {props.isSubmitting ? 'Submitting' : 'Submit'}
          </button>
        </form>
      )}
    </Formik>
  </div>
);
