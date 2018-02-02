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
            title: '',
            user: {
              name: '',
              email: '',
            },
            people: [{
              name: '',
              email: '',
            }]
          }}
          validationSchema={yup.object().shape({
            title: yup.string().required().label('Title'),
            user: yup.object().shape({
              name: yup.string().required().min(1).label('Name'),
              email: yup.string().email().required().label('Email'),
            }),
            people: yup.array().of(yup.object().shape({
              name: yup.string().required().min(1).label('Name'),
              email: yup.string().email().required().label('Email'),
            }))
          })}
          onSubmit={(values)=>{window.alert(`Hello ${values.user.name} (${values.user.email})`)}}
          render={({handleSubmit})=>(
            <form onSubmit={handleSubmit}>
              <Field
                name='title'
                label='Title'
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
                name='user.name'
                label='User Name'
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
                name='user.email'
                label='User Email (normalized to lower case, formatted to upper case)'
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
              <Field
                name='people.0.name'
                label='People[0] Name'
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
                name='people.0.email'
                label='People[0] Email'
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
