import React, { useState } from "react";
import registerService from "services/register";
import { useForm } from "react-hook-form";

export default function Register() {
  const { handleSubmit, register, formState:{errors} } = useForm()
  const [registered, setRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = values => {
    setIsSubmitting(true)
    registerService(values)
    .then(() => {
      setRegistered(true)
      setIsSubmitting(false)
    })
  };

  if (registered) {
    return <h4>
      Congratulations✅! You've been seccessfully register!
      </h4>
  }
  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        {errors.username && <small className='form-error'>{errors.username.message} </small>}
        <input
          className={errors.username ? "error" : ""}
          name="username"
          placeholder="Put here the username"
          {...register("username",{required: "Required"})}
        />
        {errors.name && <small className='form-error'> {errors.name.message} </small>}
        <input
          className={errors.name ? "error" : ""}
          name="name"
          placeholder="Put here the name"
          {...register("name",{required: "Required" })}
        />
        {errors.password && <small className='form-error'> {errors.password.message} </small>}
        <input
          className={errors.password ? "error" : ""}
          name="password"
          placeholder="Put here the password"
          type = 'pasword'
          {...register("password",
          {required: "Required", minLength: {value: 6, message: 'must be have min 6 charaters'} })} 
        />
        <button className="btn" disabled={isSubmitting}>
          Registrarse
        </button>
      </form>
    </>
  );
}

