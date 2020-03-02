import * as React from "react";
import { Field } from "formik";

export const FieldWrapper = ({ field, errors, touched }) =>
  <div key={field.id}>
    <Field
      type={field.type}
      name={field.id}
      placeholder={field.placeholder}
      autoComplete="off"
    />
    {errors[field.id] && touched[field.id] &&
      <p style={{
        color: 'red',
      }}>{errors[field.id]}</p>
    }
  </div>
