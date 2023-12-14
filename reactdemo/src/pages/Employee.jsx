import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";
import {Collapse, useDisclosure, Button, Box, FormControl,FormLabel, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react';



function Employee ({firstname, lastname, middlename,email, contactnumber,address,position,salary,birthdate,sex ,degree ,deleteEmployee, updateEmployee,handleEmployeeUpdate , employeeID}) {

    const { isOpen, onToggle } = useDisclosure()

    return (

        <div className="alert alert-light" >
           

       <Link 
       className="fw-bold" to="updateemployee" > {lastname}, {firstname}</Link>
        
        <button 
         onClick= {()=>{
            deleteEmployee(employeeID, firstname, lastname, middlename,email, contactnumber,address,position,salary,birthdate,sex , degree)
        }} className="btn btn-danger btn-sm float-end">Delete</button>

<button onClick = {()=>{  
            updateEmployee(employeeID, firstname, lastname, middlename,email, contactnumber,address,position,salary,birthdate,sex , degree)  
        }}   className="btn btn-dark btn-sm float-end mx-2">Update</button>

       
       
        </div>

           
    )
}
export default Employee;
