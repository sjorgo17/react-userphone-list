import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const UserForm = () => {

    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [numbers, setNumbers] = useState([{phoneNumber: null , type: null}]);

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = () => {
      addUser();
    };

return(

<form className="UserForm" onSubmit={handleSubmit(onSubmit)} data-testid="form">
    <h2>User Form</h2>
    <div className="container">

        <div className="row">
            <div className="col-25">
                <label>First Name</label>
                <label className="error" data-testid="name-error">{errors.name && errors.name.message}</label>
            </div>
            <div className="col-75">
                <input
                id="fname"
                name="name"
                type="text"
                placeholder="Enter name"
                defaultValue={name}
                onChange={e => setName(e.target.value)}
                ref={register({
                    required: "*"
                  })}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-25">
                <label>Last Name</label>
                <label className="error" data-testid="surname-error">{errors.surname && errors.surname.message}</label>
            </div>
            <div className="col-75">
                <input
                id="lname"
                name="surname"
                type="text"
                placeholder="Enter surname"
                defaultValue={surname}
                onChange={e => setSurname(e.target.value)}
                ref={register({
                    required: "*"
                  })}
                />
            </div>
        </div>
        
        <div className="row">
            <div className="col-25">
                <button id="add"  type="button" onClick={() => handleAdd()}> + Add Number</button>
            </div>
            <div className="col-75">
            <label>Phone numbers </label>
            <label className="error" data-testid="type-error">{errors.type && errors.type.message}</label>
            <label className="error" data-testid="number-error">{errors.phoneNumber && errors.phoneNumber.message}</label>
            </div>
        </div>

    {numbers.map((number, idx) => {
        return (
            <div className="row" key={idx}>

                <div className="col-25">
                </div>
                <div className="col-75" key={`${number}-${idx}`}>

                    <select 
                    id="type" 
                    name="type" 
                    value={number.type || ""} 
                    onChange={e => handleChangeType(idx, e)}
                    ref={register({
                        required: "*"
                      })}
                    data-testid="select"
                    >
                        <option disabled hidden value=''>Type</option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                    </select>

                    <input
                    id="phone"
                    name="phoneNumber"
                    type="phone"
                    placeholder="Enter phone number"
                    value={number.phoneNumber || ""}
                    onChange={e => handleChangeNumber(idx, e)}
                    ref={register({
                        required: "*",
                        pattern: {
                            value: /^[0-9*#+-]+$/i,
                            message: "invalid phone number"
                          }
                      })}
                    />
                    <button id="cancel" type="button" onClick={() => handleRemove(idx)}>
                    X
                    </button>

                </div>
            </div>
        );
    })}

    <button id="submit" type="submit"> Submit </button>

    </div>
</form>
);
function handleChangeNumber(i, event) {
    const values = [...numbers];
    values[i].phoneNumber = event.target.value;
    setNumbers(values);
}

function handleChangeType(i, event) {
    const values = [...numbers];
    values[i].type = event.target.value;
    setNumbers(values);
}

function handleAdd() {
    const values = [...numbers];
    values.push({ phoneNumber: null,type: null });
    setNumbers(values);
}

function handleRemove(i) {
    const values = [...numbers];
    values.splice(i, 1);
    setNumbers(values);
}

async function addUser(){
    const user = { name, surname ,numbers};
    const user_response = await fetch("/general_add", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    user_response.json().then(data =>{
        if (data.success===true){
            alert("User saved!");
            window.location.reload();
        }
    });  
    }
    
};