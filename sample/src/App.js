import React, { Component } from 'react';
import {Formik} from 'formik';
import Field from 'formik-field';
import yup from 'yup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Formik
          initialValues={{
            name: '',
            email: '',
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required().min(1).label('Name'),
            email: yup.string().email().required().label('Email'),
          })}
          onSubmit={(values)=>{window.alert(`Hello ${values.name} (${values.email})`)}}
          render={({handleSubmit})=>(
            <form onSubmit={handleSubmit}>
              <Field
                name='name'
                label='Name'
                render={({handleChange, handleBlur, value, error, label})=>(
                  <div>
                    <div>{label}</div>
                    <div>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                      />
                    </div>
                    {
                      error &&
                      <div>
                        {error}
                      </div>
                    }
                  </div>
                )}
              />
              <Field
                name='email'
                label='Email (normalized to lower case, formatted to upper case)'
                normalize={(val='')=>(val.toLowerCase())}
                format={(val='')=>(val.toUpperCase())}
                render={({handleChange, handleBlur, value, error, label})=>(
                  <div>
                    <div>{label}</div>
                    <div>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                      />
                    </div>
                    {
                      error &&
                      <div>
                        {error}
                      </div>
                    }
                  </div>
                )}
              />
              <button type='submit'>Go</button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default App;
