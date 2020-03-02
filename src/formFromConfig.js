import * as React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { DuckWrapper } from "./duck";
import { FieldWrapper } from "./fieldWrapper";

// Config including schema
const firstName = {
  id: "firstName",
  type: "text",
  dataType: "string",
  initialValue: "",
  placeholder: "First name",
  schema: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Please enter a name'),
}

// Config including schema
const lastName = {
  id: "lastName",
  type: "text",
  dataType: "string",
  initialValue: 'Williams',
  placeholder: "Last Name",
  schema: Yup.string().when("firstName", (firstName, schema) => {
    return firstName && firstName.length > 2
      ? schema.required("Please enter a last name")
      : schema.notRequired();
  }),
}

// Config including schema
const email = {
  id: "email",
  type: "email",
  dataType: "string",
  initialValue: "",
  placeholder: "Email address",
  schema:
    Yup.string()
      .email('Invalid email')
      .required('Email required')
}

// Config including yup method arguments
// instead of a schema
const cheese = {
  id: "cheese",
  type: "text",
  initialValue: "",
  dataType: "string",
  placeholder: "Cheese",
  yupMethodArgs: [
    {
      type: "numberCheck",
      message: ["This field must be text only, no numbers"]
    },
    {
      type: "cheeseCheck",
      message: ["This field must be 'cheese'"]
    },
  ]
}

// Config for a non-form component
// to include in the form.
// This is an annoying duck that sets/overwrites
// the firstName field value
const duck = {
  id: "firstName",
  component: DuckWrapper,
}

// Example of a custom Yup method
Yup.addMethod(Yup.string, "cheeseCheck", function (message) {
  return this.test({
    message,
    name: "cheeseCheck",
    test: (value) => value && value.toLowerCase() === "cheese"
  });
});

Yup.addMethod(Yup.string, "numberCheck", function (message) {
  return this.test({
    message,
    name: "numberCheck",
    test: (value) => isNaN(value)
  });
});

// Combine all the respective configs into one
const formConfig = [duck, cheese, email, lastName, firstName];

// Reduce the config to get the Yup schema object
const generateValidationSchema = (config) =>
  Yup.object().shape(config.reduce((acc, curr) => {
    if (!curr) {
      return acc;
    }

    if (curr.schema) {
      return {
        ...acc,
        [curr.id]: curr.schema,
      }
    }

    if (curr.yupMethodArgs) {
      let yupCheck = Yup[curr.dataType]();

      curr.yupMethodArgs.forEach(check => {
        const {
          type,
          message
        } = check

        yupCheck = yupCheck[type](...message);
      })

      return {
        ...acc,
        [curr.id]: yupCheck
      }
    }
  }, {}));

// Reduce the config to get initial values
const getInitialValues = (config) =>
  config.reduce((acc, curr) => {
    if (curr) {
      return {
        [curr.id]: curr.initialValue,
        ...acc,
      }
    }

    return acc;
  }, {});

// Reduce the config to get the fields to render
// Also pass in the Formik errors and touched props
// so they can be conditionally rendered alongside the field
const renderFields = (config, errors, touched) =>
  config.reduce((acc, curr) => {
    if (curr && curr.component) {
      const Component = curr.component;
      return [<Component field={curr} errors={errors} touched={touched} key={`${curr.id}-component`} />, ...acc];
    }

    if (curr) {
      const field = <FieldWrapper field={curr} errors={errors} touched={touched} />

      return [field, ...acc];
    }

    return acc;
  }, []);

export const Form = () => (
  <div>
    <h1>Formik Form (from config)</h1>
    <h2>With Yup Validation and Custom Components</h2>
    <Formik
      initialValues={getInitialValues(formConfig)}
      validationSchema={generateValidationSchema(formConfig)}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit} noValidate>
          {renderFields(formConfig, props.errors, props.touched)}
          <button type="submit">
            {props.isSubmitting ? 'Submitting' : 'Submit'}
          </button>
        </form>
      )}
    </Formik>
  </div>
);
