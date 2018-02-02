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
Formik field provided a `Field` component which uses context provided by formik forms.

```js
import {Formik} from 'formik';
import Field from 'formik-field';

const SomeForm = ()=>(
    <Formik
        //...
        render={({handleSubmit})=>(
            <form onSubmit={handleSubmit}>
                <Field
                    name='name'
                    label='Name'
                    render={({label, handleChange, handleBlur, value, error, touched})=>(
                        <div>
                            <div>{label}</div>
                            <div>
                                <input
                                    type='text'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={value}
                                />
                            </div>
                            {
                                touched && error &&
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
)
```