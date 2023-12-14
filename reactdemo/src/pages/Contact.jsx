import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./firebaseConfig";
import { useState } from 'react';
import React from 'react';



function Contact () {
    


    const [email, setEmail] = useState('');

    const handleSubmit = () => {

        if (email !== '' ) {
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email)
            .then((userCredential) => {
    // Signed in 
           const user = userCredential.user;
          
           
   // ...
  })
           .catch((error) => { 
           alert("error!");
           const errorCode = error.code;
           const errorMessage = error.message;
  });

} else{
    alert("Fill up the missing fields!")
}

}



    return(

        
        <div className="container border border-dark p-3 rounded w-50 mt-5">
            <div className="fw-bold h3 text-center">Contact Us!</div>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-control" onChange={(e)=> setEmail(e.target.value)} value={email} />
            <br/>

            <p><label htmlFor="message">Message:</label></p>
            <textarea name="message" id="message" cols="75" rows="4"></textarea>

         
            <div className="d-flex justify-content-center">
            <button className="btn btn-dark  mt-3 d-flex " onClick={()=>handleSubmit()}>Submit</button>
            </div>

            

            
  
        </div>

        
    )
}

export default Contact;