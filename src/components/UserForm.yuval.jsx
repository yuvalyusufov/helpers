import React from "react";
import { useForm } from "react-hook-form";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("username")); // watch input value by passing the name of it
  console.log(errors);
  const validationProps = {
    username: {
      required: true,
      minLength: 2,
      maxLength: 12,
    },
    password: {
      required: true,
      minLength: 5,
      maxLength: 12,
    },
    messages: { 
        required: function() {
            return 'This field is required'
        },
        minLength: function() {
            return `This field must be longer then ${this.minLength}`;
        },
        maxLength: function() {
            return `This field cannot be longer then ${this.maxLength}`;
        },

    }
  };
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        placeholder="Username"
        defaultValue=""
        {...register("username", validationProps.username)}
      />
      {["required", "minLength", "maxLength"].includes(errors.username?.type) && (
        <span>{validationProps.messages[errors.username.type].call(validationProps.username)}</span>
      )}

      {/* include validationProps with required or other standard HTML validationProps rules */}
      <input
        type="password"
        placeholder="Password"
        {...register("password", validationProps.password)}
      />
      {/* errors will return when field validationProps fails  */}
      {["required", "minLength", "maxLength"].includes(errors.password?.type) && (
        <span>{validationProps.messages[errors.password.type].call(validationProps.password)}</span>
      )}

      <input type="submit" />
    </form>
  );
}
