import * as React from "react";
import { Formik } from 'formik';

export const Form = () => (
  <div>
    <h1>Formik Form</h1>
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
          <input
            type="text"
            onChange={props.handleChange}
            value={props.values.name}
            name="name"
            placeholder="Name"
          />
          <input
            type="email"
            onChange={props.handleChange}
            value={props.values.email}
            name="email"
            placeholder="Email"
          />
          <button type="submit">
            {props.isSubmitting ? 'Submitting' : 'Submit'}
          </button>
          {console.log(props)}
        </form>
      )}
    </Formik>
  </div>
);
