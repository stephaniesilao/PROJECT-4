import {Outlet, Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


function Layout () {

  const [authenticated, setAuthenticated]  = useState(false);



  let navigate = useNavigate();

  useEffect(()=>{

    
    const auth = getAuth(firebaseApp);
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log(user.email);
        setAuthenticated(true)
        const uid = user.uid;
      } else {
        // User is signed out
        // ...
      }
    });
  

  },[])

  const logout = () => {
    
    const auth = getAuth(firebaseApp);
    signOut(auth).then(() => {
      
      setAuthenticated(false)
      
  navigate("/login");
    }).catch((error) => {
  // An error happened.
});
  }
    return(
      <div style={{backgroundImage: "url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg')"}}>

<main className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
              <Link to="/" className="icon"><img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" /></Link>
            <Link className="navbar-brand fw-bold text-white" to="/">Dashboard</Link>
            
  <button className="navbar-toggler bg-light"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    
      <li className="nav-item">
      <Link className="nav-link fw-bold text-white" to="contact">Contact</Link>
      </li>

      
      
    </ul>

    <ul className="navbar-nav ms-auto" >

    { authenticated 
      ?
      <li className="nav-item">
      <Link className="nav-link fw-bold text-white" onClick={logout}>Log out</Link>
      </li>
      :
     <>
     <li className="nav-item">
      <Link className="nav-link fw-bold text-white" to="login">Login</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link fw-bold text-white" to="register">Register</Link>
      </li> 
     </>

      } 

    </ul>
  </div>
            </div>
  
</nav>





<Outlet></Outlet>
 
<footer  className=" p-5 text-center mt-auto">
Copyright © 2023. All rights reserved.
<br/>
<small className="fw-bold">Developed by: STEPHANIE SILAO</small>
</footer>
       
        </main>

      </div>
        

        
        
    )
}

export default Layout;
