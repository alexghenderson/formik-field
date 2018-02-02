## Overview
I started using Formik recently, and so far, I really like it. But I wanted to use render props for my field, and I wanted to simplify writing my fields. So I wrote this.

## Installation
Install formik:
```bash
npm install --save formik
```

Install formik field:
```bash
npm install --save formik-field
```

## Usage
Formik field provided a `Field` component which uses context provided by formik forms. As such, it must be nested inside a formik form.

Formik field takes a few props:
* `name: string` name of the field
* `label: string` label for the field
* `normalize?: (val: any)=>(any)` function for normalizing values prior to being stored in state
* `format?: (val: any)=>(any)` function for formatting values before being passed to the field

and one of the two following render properties
* `render` or `children`

The render function has the following signature:
* `render({label, name, handleChange, handleBlur, value, error, touched})=>ReactNode`

I wrote this to automate the mapping of the event handlers, touched, error and value objects.

## Example

```js
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
```

See [sample](https://github.com/alexghenderson/formik-field/blob/master/sample/src/App.js) for format and normalize

## Tips
Make a snippet for this. 