import Employee from "./Employee";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";
import firebaseApp from "./firebaseConfig";
import "./Design.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Collapse, useDisclosure, Button, Box, FormControl,FormLabel, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react';




function Home (){

    let navigate = useNavigate();

    const [employee,setEmployee] = useState({
        firstname: '',
        lastname:'',
        middlename:'',
        email:'',
        sex:'',
        contactnumber:'',
        position:'',
        salary: '',
        birthdate:'',
        address: '',
        degree:''
    });

    const [employeeList, setEmployeeList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);

    const [editToggle, setEditToggle] = useState(false);

    const [userProperties, setUserProperties] = useState({});

    const { isOpen, onToggle } = useDisclosure([]);

    const { isClose, Toggle } = useDisclosure([]);

   



    useEffect(()=>{

        
        //Initialize cloud firestore and get a reference to the service
          const db = getFirestore(firebaseApp);

          try {
           
            onSnapshot(collection(db,'employees'), snapshot => {

                const newEmployeeList = [];

                snapshot.forEach(employee =>{
                    const tempEmployee =  employee.data();
                    tempEmployee["employee_id"] = employee.id;
                    newEmployeeList.push(tempEmployee);   
                });
                setEmployeeList(newEmployeeList);
            });

          } catch(e) {
            alert('Could not fetch employee data!')
          }

          const auth = getAuth(firebaseApp);
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log(user.email);
        setAuthenticated(true)
        console.log(user.providerData);
        setUserProperties(user);
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });


        
    },[])

    const addEmployee = () => {


        //Initialize cloud firestore and get a reference to the service

          const db = getFirestore(firebaseApp); 


        if(employee.firstname==='' || employee.lastname==='' || employee.middlename==='' || employee.contactnumber ==='' ||
            employee.address ==='' || employee.position==='' || employee.salary==='' || employee.birthdate==='' || employee.sex==='' || employee.email==='' || employee.degree===''){
                Swal.fire("Please fill in the missing fields!");
        } else {
            setEmployeeList(
                employeeList => [
                    ...employeeList, employee
                ]
               );

               addDoc(collection(db,'employees'), employee);

               setEmployee({
                firstname:'',
                lastname: '',
                middlename: '',
                email:'',
                contactnumber: '',
                address: '',
                position: '',
                salary: '',
                birthdate: '',
                sex:'',
                degree:''
               });

               Swal.fire({
                title: "Successfully Added!",
                icon: "success"
              });

               

               // localStorage.setItem('studentList', JSON.stringify(studentList));
               
            }

        }

        const deleteEmployee = (employeeID, firstname, lastname) => {

            //Initialize cloud firestore and get a reference to the service
            const db = getFirestore(firebaseApp)

            Swal.fire({
                icon: "question",
                title: `Are you sure you want to delete ${firstname} ${lastname}?`,
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteDoc(doc(db, "employees", employeeID));
                    Swal.fire({
                        
                        icon: "success",
                        title: "Success!",
                        text: `${firstname} ${lastname} has been deleted.`,
                    });
                } else if (result.isDenied) {
                    Swal.fire({
                       
                        icon: "success",
                        title: "Cancelled",
                        text: "Deleting records has been cancelled.",
                    });
                }
            });

        //     confirm(`Are you sure you want to delete ${firstname} ${lastname}?`).then(
        //         deleteDoc(doc(db, "employees", employeeID))
        //    );
            
        } 

       const updateEmployee = (employeeID, firstname, lastname, middlename, contactnumber, birthdate,salary, position,address, sex,email, degree) => {
        setEditToggle(true);

        

        setEmployee({
            employeeID : employeeID ,
            firstname : firstname , 
            lastname : lastname , 
            middlename : middlename,
            email : email,
            contactnumber : contactnumber,
            birthdate: birthdate,
            position: position,
            salary: salary,
            address: address,
            sex: sex,
            degree: degree

        });
       }

       const handleEmployeeUpdate = () => {
         //Initialize cloud firestore and get a reference to the service
         const db = getFirestore(firebaseApp);

         Swal.fire({
            title: "Updated!",
            icon: "success"
          });
        
        const employeeRef = doc(db, "employees", employee.employeeID);

       // Set the "capital" field of the city 'DC'
       updateDoc(employeeRef, {
        firstname : employee.firstname , 
        lastname : employee.lastname , 
        middlename : employee.middlename,
        email : employee.email,
        contactnumber : employee.contactnumber,
        address: employee.address ,
        position: employee.position,
        salary: employee.salary ,
        birthdate: employee.salary,
        sex: employee.sex,
        degree: employee.degree
       });
       setEditToggle(false);
       setEmployee({});
       }

       if(authenticated){
        return( 
            <section className="mx-5 ">
                <h1 className="mb-2">Welcome, {userProperties.displayName}</h1>
                <p>This is a list of company's employees. </p>
                <hr />
                <div className="center">
                <Button className="center " onClick={onToggle}>Add/Update Employee</Button>

                </div>

               

                <div className="center"> 
         
                                  <Collapse in={isOpen} animateOpacity>
                                    <Box className=" mb-3 " 
                                      
                                      backgroundColor='#fff'
                                      mt={5}
                                      boxSize="md"
                                      h="400px"
                                      w='100%'
                                      color='white'
                                      bg='#fff'
                                      maxW='960px'
                                      shadow='md'
                                      p={5}
       
                                    >
                                          
                                    
                                        
                                <div className="row">
                                        <div className="col-md-4 d-flex justify-content-center">
                                        <FormControl isRequired>
                                         <FormLabel className="text-dark" htmlFor="firstname">First Name:</FormLabel>
                                         <input id="firstname" 
                                         onChange={(e)=>setEmployee({
                                             ...employee, 
                                             firstname: e.target.value
                                         })}
                                         value={employee.firstname}
                                         className="form-control p-2" 
                                         type="text" 
                                         /> 
                                         </FormControl>
                                         </div>    

                                         <div className="col-md-4">
                                         <FormControl isRequired>
                                             <FormLabel className="text-dark" htmlFor="lastname">Last Name:</FormLabel>
                                             <input id="lastname" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                 lastname: e.target.value
                                             })}
                                             value={employee.lastname}
                                             className="form-control p-2" 
                                             type="text" />
                                             </FormControl>
                                         </div> 

                                         <div className="col-md-4">
                                         <FormControl isRequired>
                                             <FormLabel className="text-dark" htmlFor="middlename">Middle Name:</FormLabel>
                                             <input id="middlename" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                 middlename: e.target.value
                                             })}
                                             value={employee.middlename}
                                             className="form-control p-2" 
                                             type="text" />
                                             </FormControl>
                                         </div>   

                                         <div className="col-md-4">
                                         <FormControl isRequired>
                                             <FormLabel className="text-dark" htmlFor="email">Email</FormLabel>
                                             <input id="email" placeholder="@example.com"
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                email: e.target.value
                                             })}
                                             value={employee.email}
                                             className="form-control p-2" 
                                             type="text" />
                                             </FormControl>
                                         </div>   

                                         <div className="col-md-4">
                                         <FormControl isRequired>
                                             <FormLabel className="text-dark" htmlFor="contactnumber">Contact number</FormLabel>
                                             <input id="contactnumber" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                 contactnumber: e.target.value
                                             })}
                                             value={employee.contactnumber}
                                             className="form-control p-2" 
                                             type="number" />
                                             </FormControl>
                                         </div>   

                                         <div className="col-md-4">
                                         <FormControl isRequired>
                                             <FormLabel className="text-dark" htmlFor="address">Adress</FormLabel>
                                             <input id="address" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                address: e.target.value
                                             })}
                                             value={employee.address}
                                             className="form-control p-2" 
                                             type="text" />
                                             </FormControl>
                                         </div> 

                                         <div className="col-md-4 form-group">
                                         <FormControl>
                                             <FormLabel className="text-dark" htmlFor="sex">Sex</FormLabel>
                                             <select id="sex" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                sex: e.target.value
                                             })}
                                             value={employee.sex}
                                             className="form-control p-2" 
                                             type="text" >
                                                 <option >Select here</option>
                                                <option >Male</option>
                                                <option >Female</option>

                                                </select>
                                            
                                             </FormControl>
                                         </div> 

                                         <div className="col-md-4">
                                         <FormControl>
                                             <FormLabel className="text-dark" htmlFor="birthdate">Birthdate</FormLabel>
                                             <input id="birthdate" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                birthdate: e.target.value
                                             })}
                                             value={employee.birthdate}
                                             className="form-control p-2" 
                                             type="date" />
                                             </FormControl>
                                         </div> 

                                         <div className="col-md-4">
                                         <FormControl>
                                             <FormLabel className="text-dark" htmlFor="position">Position</FormLabel>
                                             <input id="position" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                position: e.target.value
                                             })}
                                             value={employee.position}
                                             className="form-control p-2" 
                                             type="text" />
                                             </FormControl>
                                         </div>

                                         <div className="col-md-4">
                                         <FormControl>
                                             <FormLabel className="text-dark" htmlFor="salary">Salary</FormLabel>
                                             <input id="salary" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                salary: e.target.value
                                             })}
                                             value={employee.salary}
                                             className="form-control p-2" 
                                             type="number" />
                                             </FormControl>
                                         </div> 

                                         <div className="col-md-8 form-group">
                                         <FormControl>
                                             <FormLabel className="text-dark" htmlFor="degree">Degree</FormLabel>
                                             <select id="degree" 
                                             onChange={(e)=>setEmployee({
                                                 ...employee,
                                                degree: e.target.value
                                             })}
                                             value={employee.degree}
                                             className="form-control p-2" 
                                             type="text"  >
                                                <option >Choose your degree</option>
                                                <option >Bachelor of Arts</option>
                                                <option >Bachelor of Science in Accountancy</option>

                                                </select>
                                            
                                             </FormControl>
                                         </div> 
                            
                                         </div>     

                                         {
                            editToggle
                            ?
                            (

                                
                            <div className="row justify-content-center mt-4">
                        

                            <button onClick={()=>{ 
                                
                                 handleEmployeeUpdate()}} className="btn btn-success mt-2" >Update</button>
                            
                            </div>
         
                                    
                            )                    
                             
                        :
                        
                        (
                            
                            <div className="row justify-content-center mt-2">
                            <button onClick={()=>{addEmployee()}} className="btn btn-dark btn-center mt-3 " >Add Employee +</button>
                            </div>
                        )
                       
                        }
                                         

                          
                               
                               </Box>
                               </Collapse>
                            
                               </div> 

                              
                              


                <div className="card mt-2">
                    <div className="card-body">

                    <h2 className="fw-bold">👨🏻‍💻👩🏻‍💻 Employees</h2>
           
                        {
                    employeeList.map((employeeRecord)=>(
                
                        <Employee 
                        key={employeeRecord.id}
                        firstname={employeeRecord.firstname}
                        lastname={employeeRecord.lastname}
                        middlename={employeeRecord.middlename}
                        email={employeeRecord.email}
                        contactnumber={employeeRecord.contactnumber}
                        address={employeeRecord.address}
                        position={employeeRecord.position}
                        salary={employeeRecord.salary}
                        birthdate={employeeRecord.birthdate}
                        sex={employeeRecord.sex}
                        degree={employeeRecord.degree}
                        deleteEmployee={deleteEmployee}
                        updateEmployee={updateEmployee}
                        employeeID = {employeeRecord.employee_id}
                        />        
                    ))
                }
               
               
                    </div>

                </div>
     
            </section>
        )
       } 
  
}

export default Home;