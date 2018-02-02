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
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required().min(1).label('Name'),
          })}
          onSubmit={(values)=>{window.alert(`Hello ${values.name}`)}}
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
              <button type='submit'>Go</button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default App;
