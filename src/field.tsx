import * as React from 'react';
import * as PropTypes from 'prop-types';
import getDeep from 'get-deep';
import invariant from 'invariant';
import {connect, getIn, Field as FormikField} from 'formik';
import {normalize} from 'path';

export interface RenderProps {
  name: string;
  handleChange: (w?: any) => void;
  handleBlur: () => void;
  value: any;
  touched: boolean;
  error: any;
  label: any;
}

export interface FieldProps {
  name: string;
  label?: string;
  render?: (props: RenderProps) => React.ReactNode;
  children?: (props: RenderProps) => React.ReactNode;
  format?: (value: any) => any;
  normalize?: (value: any) => any;
}

class Field extends React.Component<FieldProps, {}> {
  static propTypes = {
    children: PropTypes.func,
    render: PropTypes.func,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    format: PropTypes.func,
    normalize: PropTypes.func,
  };
  render() {
    const {children, render, name, label, format, ...field} = this.props;
    const r = render || children;
    invariant(
      typeof r === 'function',
      'Must have render function specified as render or children prop'
    );
    return (
      <FormikField>
        {(props) => {
          const {form} = props;
          return r({
            name,
            handleChange: (e) => {
              const value = e && e.target ? e.target.value : e;
              form.setFieldValue(name, normalize ? normalize(value) : value);
            },
            handleBlur: () => {
              form.setFieldTouched(name, true);
            },
            value: format
              ? format(getDeep(form.values, name))
              : getDeep(form.values, name),
            touched: getDeep(form.touched, name),
            error: getDeep(form.errors, name),
            label,
            ...field,
          });
        }}
      </FormikField>
    );
  }
}

export default connect(Field);
