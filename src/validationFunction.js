import * as React from "react";
import { Formik, Field } from 'formik';

const validateEmail = (value) => {
  let error;

  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }

  return error;
}

export const Form = () => (
  <div>
    <h1>Formik Form</h1>
    <h2>With Inline Validation</h2>
    <Formik
      initialValues={
        {
          name: '',
          email: '',
        }
      }
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
              name="name"
              placeholder="Name"
            />
          </div>
          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              validate={validateEmail}
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
          {console.log(props)}
        </form>
      )}
    </Formik>
  </div>
);
