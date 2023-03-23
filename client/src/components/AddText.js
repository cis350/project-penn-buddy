import React from "react";
/**
 * Adds a new student to the roster
 * @param {*} props  the list of student mutator 
 * function
 */
function AddText(props){

    let senderId
    let content;

    const handleOnChange = (e) =>{
        // check if the name was updated
        if(e.target.content === "content"){
            newContent = e.target.value;
        }
        if(e.target.name === "senderId"){
            newSenderId = e.target.value;
        }
    } 

    const handleOnSubmit = (e) =>{
        // prevent the form submit event to 
        // reload the page
        e.preventDefault();
        const newText ={senderId: newSenderId, content: newContent};

        //reset the form
        const form = document.getElementById("add");
        form.reset();
        // update the state
        props.addNewStudent([...props.texts, newText]);
    }

    return(
        <div>
            { ' '}
            <form id="add" onSubmit={handleOnSubmit}>
                <input 
                type="text"
                name="name"
                id="name"
                placeholder="Name ..."
                onChange={handleOnChange}
                />
                <input 
                type="text"
                name="email"
                id="email"
                placeholder="Email ..."
                onChange={handleOnChange}
                />
                <input 
                type="text"
                name="major"
                id="major"
                placeholder="Major ..."
                onChange={handleOnChange}
                />
                <button type="submit">Add new student</button>
            </form>
        </div>

    )

}

export default AddStudent;