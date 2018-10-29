import React, {Component} from 'react';
import {Formik, Form} from 'formik';
import Field from '../../';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
          render={() => (
            <Form>
              <Field
                name="firstName"
                label="First Name"
                render={({
                  handleChange,
                  handleBlur,
                  value,
                  error,
                  label,
                  name,
                }) => (
                  <React.Fragment>
                    <label htmlFor={name}>{label}</label>
                    <input
                      type="text"
                      name={name}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={value}
                    />
                    <div hidden={!error}>{error}</div>
                  </React.Fragment>
                )}
              />

              <Field
                name="lastName"
                label="Last Name"
                render={({
                  handleChange,
                  handleBlur,
                  value,
                  error,
                  label,
                  name,
                }) => (
                  <React.Fragment>
                    <label htmlFor={name}>{label}</label>
                    <input
                      type="text"
                      name={name}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={value}
                    />
                    <div hidden={!error}>{error}</div>
                  </React.Fragment>
                )}
              />

              <Field
                name="email"
                label="Email"
                placeholder="jane@acme.com"
                type="email"
                render={({error, label, name, ...field}) => (
                  <React.Fragment>
                    <label htmlFor={name}>{label}</label>
                    <input name={name} {...field} />
                    <div hidden={!error}>{error}</div>
                  </React.Fragment>
                )}
              />
            </Form>
          )}
        />
      </div>
    );
  }
}

export default App;
