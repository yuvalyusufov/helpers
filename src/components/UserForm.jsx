import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {useContext} from 'react';
import {UsersContext} from './../contexts/usersContext';

export default function UserForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => console.log(data);

  const {users, addUser, removeUser} = useContext(UsersContext);

  const handleAddUser = (user) => {
    addUser(user);
  } 

  const handleRemoveUser = (id) => {
    removeUser(id);
  } 

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("multipleErrorInput", {
            required: "This is required.",
            pattern: {
              value: /d+/,
              message: "This input is number only.",
            },
            maxLength: {
              value: 10,
              message: "This input exceed maxLength.",
            },
            minLength: {
              value: 2,
              message: "This input must be at least 2 characters",
            },
          })}
        />

        <ErrorMessage
          errors={errors}
          name="multipleErrorInput"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />

        <input type="submit" />
      </form>
      <button onClick={() => handleAddUser({id: users.length === 0 ? 1 : users[users.length - 1].id + 1, name:'yuval'})}>
        Add from child
      </button>
      <button onClick={() => handleRemoveUser( users[users.length - 1]?.id)}>
        Remove from child
      </button>
    </>
  );
}
