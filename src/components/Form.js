import React from "react";

export default function Form(props) {
     function handleSubmit(e){
            e.preventDefault();
            props.addTask('ALLO');
        }
    return(
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todp-input" className="label__lg">
            De quoi avons nous besoin
          </label>
         
        </h2>
        <input
           type="text"
           id="new-todo-input"
           className="input input__lg"
           name="text"
           autoComplete="off"
           />
        <button type="submit" className="btn btn__primary btn__lg">
          Ajouter  
        </button>   
      </form>
    )
};