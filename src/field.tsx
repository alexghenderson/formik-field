import * as React from 'react';
import * as PropTypes from 'prop-types';
import getDeep from 'get-deep';

export interface RenderProps {
    name: string,
    handleChange: (w?: any)=>void,
    handleBlur: ()=>void,
    value: any,
    touched: boolean,
    error: any,
    label: any,
}

export interface FieldContext {
    formik: {
        touched: {
            [name: string]: boolean,
        },
        values: {
            [name: string]: any,
        },
        errors: {
            [name: string]: any,
        },
        setFieldTouched: (field: string, value: any) => void,
        setFieldValue: (field: string, value: any) => void,
    },
}

export interface FieldProps {
    name: string,
    label?: string,
    render?: (props: RenderProps)=>React.ReactNode,
    children?: (props: RenderProps)=>React.ReactNode,
    format?: (value: any)=>any,
    normalize?: (value: any)=>any,
}

export default class Field extends React.Component<FieldProps, {}> {
    static contextTypes = {
        formik: PropTypes.object,
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        render: PropTypes.func,
        children: PropTypes.func,
        format: PropTypes.func,
        normalize: PropTypes.func,
    }

    constructor(props: FieldProps, context: FieldContext) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);    
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e: any) {
        const {name, normalize} = this.props;
        const {setFieldValue} = this.context.formik;

        let value = e && e.target ? e.target.value : e;
        
        setFieldValue(name, normalize ? normalize(value) : value);
    }

    handleBlur() {
        const {name} = this.props;
        const {setFieldTouched} = this.context.formik;

        setFieldTouched(name, true);
    }

    shouldComponentUpdate(nextProps: FieldProps, _: any, nextContext: FieldContext) {
        if(this.props.name !== nextProps.name || this.props.label !== nextProps.label) {
            return true;
        }

        const {name} = this.props;

        if(getDeep(this.context.formik.values, name) !== getDeep(nextContext.formik.values, name)) {
            return true;
        }
        if(getDeep(this.context.formik.errors, name) !== getDeep(nextContext.formik.errors, name)) {
            return true;
        }
        if(getDeep(this.context.formik.touched, name) !== getDeep(nextContext.formik.touched, name)) {
            return true;
        }
        return false;
    }

    render() {
        const {render, children, name, label, format} = this.props;
        const {values, touched, errors} = this.context.formik;
        const r = render || children as (props: RenderProps)=>React.ReactNode;
        
        const value = getDeep(values, name);
        return r({
            name,
            handleChange: this.handleChange,
            handleBlur: this.handleBlur,
            value: format ? format(value) : value,
            touched: getDeep(touched, name),
            error: getDeep(errors, name),
            label: label || name,
        });
    }
}