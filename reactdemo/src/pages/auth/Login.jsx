import {Link, useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState } from 'react';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";

function Login () {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const handleLogin = () => {
 
        if (email !== '' && password !== '') {
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
    // Signed in 
           const user = userCredential.user;
           Swal.fire({
            title: "You successfully logged in!",
           
            icon: "success"
          });

        
           navigate("/"); 
           
   // ...
  })
           .catch((error) => { 
           alert("error!");
           const errorCode = error.code;
           const errorMessage = error.message;
  });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Missing crredentials!",
                footer: '<a href="#">Please fill in the missing fields</a>'
              });
             
        }
    
    }
    

    return(

       <div >
        
        <h1 className='text-center fw-bold'>Welcome to Employees Dashboard</h1>
        <h4 className='text-center' >Please login to access.</h4>
        <div className="container  border border-dark p-3 rounded w-50 mt-5">
            <div className="fw-bold h3">Login</div>
            <p>Enter your email and password to login.</p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" onChange={(e)=> setEmail(e.target.value)} value={email} />
            <label htmlFor="password" className="mt-3">Password</label>
            <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password} />
            <button className="btn btn-dark mt-3" onClick={()=> handleLogin()}
            
                >Login</button> 
            <hr/>
            <Link className='text-dark' to="/register" > <u>Don't have an account? Register here. </u></Link>
        </div>

       </div>
        
    )
}

export default Login;