import * as React from "react";
import { Formik } from 'formik';

export const Form = () => (
  <div>
    <h1>Formik Form</h1>
    <h2>With Submit Validation</h2>
    <Formik
      initialValues={
        {
          name: '',
          email: '',
        }
      }
      validate={(values) => {
        let errors = {};

        if (!values.email) {
          errors = {
            ...errors,
            email: 'Please enter an email'
          };
        }

        return errors;
      }}
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
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.name}
              name="name"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              onChange={props.handleChange}
              value={props.values.email}
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
          {console.log(props)}
        </form>
      )}
    </Formik>
  </div>
);
