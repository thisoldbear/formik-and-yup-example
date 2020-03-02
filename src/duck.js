import * as React from "react";
import { Field } from "formik";

export const Duck = ({ speak, clickHandle }) =>
  <div className="duck" onClick={clickHandle}>
    🦆{speak && ` Hello ${speak}`}
  </div>

export const DuckWrapper = (props) =>
  <Field>
    {({ form, meta }) => {
      return (
        <Duck {...props} speak={meta.value[props.field.id]} clickHandle={() => {
          form.setFieldValue(props.field.id, "Quack")
        }} />
      )
    }}
  </Field>
