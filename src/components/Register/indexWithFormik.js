import React, { useState } from "react";
import register from 'services/register'
import { Formik, Form, Field, ErrorMessage } from "formik";

const validateFields = values => {
    const errors = {}
                if (!values.username) {
                    errors.username = 'Required username'
                }

                if (!values.name) {
                    errors.name = 'Reqired name'
                }

                if (!values.password) {
                    errors.password = 'Required password'
                } else if (values.password.length < 6) {
                    errors.password = 'Length must be greater than 6'
                }

                return errors;
}

const initialValues = {
    username: '',
    password: '',
    name: '',
}

export default function Register () {
    const [registered, setRegistered] = useState(false)

    if (registered) {
        return <h4>Congratulations✅! You've been seccessfully register!</h4>
    }
    return <>
        <Formik 
            initialValues={initialValues}
            validate= {validateFields}
            onSubmit= {(values, {setFieldError} ) => {
                return register(values).then(() => {
                    setRegistered(true)
                }).catch(() => {
                     setFieldError('username', 'this username is not valid')
                 });
            }}
        >
            {
                ({errors, isSubmitting }) => (
                <Form className="form">
                    
                    <ErrorMessage className='form-error' name='username' component='small' />
                    <Field className={errors.username ? 'error' : ''} name="username" placeholder='Put here the username'/>
                    <ErrorMessage className='form-error' name='name' component='small' />
                    <Field className={errors.name ? 'error' : ''} name="name" placeholder='Put here the name'/>
                    <ErrorMessage className='form-error' name='password' component='small' />
                    <Field className={errors.password ? 'error' : ''} name="password" placeholder='Put here the password'
                    type='password' />
                    <button className='btn' disabled={isSubmitting}>
                        Registrarse
                    </button>
                </Form>
            )}
        </Formik>
    </>
}