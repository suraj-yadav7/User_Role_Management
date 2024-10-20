import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Inputs/Input";

/** object for formData */
const formObj = {
  firstName   : "",
  lastName    : "",
  email       : "",
  password    : "",
  mobile      : "",
}

const ManageUsers = () => {
    const [formData, setFormData]            = useState(formObj);
    const [rolesOptions, setRolesOptions]    = useState([])
    const [selectedRoles, setSelectedRoles]  = useState([]);
    const [message, setMessage]              = useState("")

    /** Server base url */
    const base_url = "http://localhost:5000"

    /** Handle formData input changes */
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    /** Add role's id into state variable */
    const handleRoleSelection = (event)=>{
      const { value } = event.target;
      setSelectedRoles(prevSelected =>
          prevSelected.includes(value)
              ? prevSelected.filter(option => option !== value)
              : [...prevSelected, value]
      );
    }

    /** Form submission */
    const handleSubmit = (e) => {
        e.preventDefault();
        createUser()
    };

    /** Create User */
    const createUser=async()=>{
      try{
        let response = await axios.post(`${base_url}/api/user/create`,
          {
            ...formData,
            roles:selectedRoles
          });
        if(response.data?.status === true){
          setMessage(response.data.message)
          setFormData({...formObj})
          setTimeout(()=>{
              setSelectedRoles([])
              setMessage("")
            },1000)
          }
      }catch(err){
        console.log("Error occur while creating user : ",err )
        setMessage(err.response?.data.message)
        setTimeout(()=>{
          setMessage("")
        },1500)
      }
    };

    /**  Fetching roles list and updating state */
    const getRoles = async()=>{
      try{
        let response = await axios.get(`${base_url}/api/role/fetch`)
        if(response.data.status === true){
          const rolesName = response.data.data.map((role)=> (
            {
              id:role._id,
              role_name:role.role_name
            }
          ));
          setRolesOptions(rolesName)
        }
      }catch(err){
        console.log("Error Occur while role fetching: ", err)
      }
    };

    useEffect(()=>{
      getRoles()
    },[])

    return (
        <div className="container">
            <h2>User Creation and Role Assignment</h2>
            {
              message && <h3 className="py-2">{message}</h3>
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Input
                        label="First Name"
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <Input
                        label="Last Name"
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <Input
                        label="Email"
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <Input
                        label="Password"
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <Input
                        label="Mobile"
                        type="number"
                        className="form-control"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                  <p className='font-weight-bold py-2 fs-6 mb-0'>Roles</p>
                  <label className="form-label">Select Roles Options</label>
                  <div
                      className="overflow-auto"
                      style={{ maxHeight: '100px' }}
                  >
                      {rolesOptions.map(option => (
                          <div key={option.id} className="form-check">
                              <input
                                  type="checkbox"
                                  id={option.id}
                                  value={option.id}
                                  name="roles"
                                  className="form-check-input"
                                  onChange={handleRoleSelection}
                                  checked={selectedRoles.includes(option.id)}
                              />
                              <label className="form-check-label" htmlFor={option.id}>
                                  {option.role_name}
                              </label>
                          </div>
                      ))}
                  </div>
              </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ManageUsers;
