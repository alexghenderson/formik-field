import * as React from 'react';
import * as PropTypes from 'prop-types';
import getDeep from 'get-deep';
import invariant from 'invariant';
import {connect, Field as FormikField} from 'formik';

export interface RenderProps {
  name: string;
  handleChange: (w?: any) => void;
  handleBlur: () => void;
  value: any;
  touched: boolean;
  error: any;
  label: any;
}

export interface RenderFieldProps {
  name: string,
  onChange: (w?: any) => void;
  onBlur: () => void;
  value: any;
}

export interface FieldProps {
  name: string;
  label?: string;
  render?: (props: RenderProps, fieldProps: RenderFieldProps) => React.ReactNode;
  children?: (props: RenderProps, fieldProps: RenderFieldProps) => React.ReactNode;
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
    const {
      children,
      render,
      name,
      label,
      format,
      normalize,
      ...field
    } = this.props;
    const r = render || children;
    invariant(
      typeof r === 'function',
      'Must have render function specified as render or children prop'
    );
    return (
      <FormikField>
        {(props) => {
          const {form} = props;
          const handleChange = (e) => {
            const value = e && e.target ? e.target.value : e;
            form.setFieldValue(name, normalize ? normalize(value) : value);
          };
          const handleBlur = () => {
            form.setFieldTouched(name, true);
          };
          const value = format
            ? format(getDeep(form.values, name))
            : getDeep(form.values, name);
          const touched = getDeep(form.touched, name);
          const error = getDeep(form.errors, name);

          return r({
            name,
            handleChange,
            handleBlur,
            value,
            touched,
            error,
            label,
            ...field,
          }, {
            name,
            value,
            onChange: handleChange,
            onBlur: handleBlur,
          });
        }}
      </FormikField>
    );
  }
}

export default connect(Field);
