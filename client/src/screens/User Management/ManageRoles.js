import React, {useEffect, useState} from 'react'
import Input  from '../../components/Inputs/Input'
import Button from '../../components/Inputs/Button';
import axios  from "axios"

const ManageRoles = () => {

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [roleName, setRoleName]               = useState("")
  const [roleData, setRoleData]               = useState([])
  const [message, setMessage]                 = useState("")

  /** All permission options from sidebar of menu */
  const options = [
    "projects",
    "tickets",
    "our_client",
    "employees",
    "accounts",
    "payroll",
    "app",
    "other_pages",
    "ui_components"
  ];

  /** Server base url */
  const base_url = "http://localhost:5000"

  /** Handling selection options */
  const handleChange = (event) => {
      const { value } = event.target;
      setSelectedOptions(prevSelected =>
          prevSelected.includes(value)
              ? prevSelected.filter(option => option !== value)
              : [...prevSelected, value]
      );
  };

  /** Handle form submit - Role creation */
  const handleSubmit = (e)=>{
    e.preventDefault()
    createRole()
  };

  /** Function create role */
  const createRole=async()=>{
    try{
      const response = await axios.post(`${base_url}/api/role/create`, {
        role_name   : roleName,
        permissions : selectedOptions
      })
      if(response.data?.status === true){
        setMessage(response.data.message)
        setTimeout(()=>{
            setSelectedOptions([])
            setRoleName("")
            setMessage("")
          },1000)
        }
    }catch(err){
      console.log("Error Occur while creating role: ", err)
      setMessage(err.response?.data.message)
      setTimeout(()=>{
        setMessage("")
      },1500)
    }
  }

  /** Initial top 5 roles fetch */
  const getRoles = async()=>{
    try{
      let response = await axios.get(`${base_url}/api/role/fetch`)
      if(response.data.status === true) setRoleData(response.data.data.slice(0,5))
    }catch(err){
      console.log("Error Occur while role fetching: ", err)
    }
  }

  useEffect(()=>{
    getRoles()
  },[])

  return (
    <>
      <div>
        {
          message && <h3 className='py-2'>{message}</h3>
        }
        <h4>Create New Role</h4>
        <form onSubmit={handleSubmit}>
          <Input label='Role Name'  value={roleName} onChange={(e)=>setRoleName(e.target.value)} />
          <div className="mb-3">
            <p className='font-weight-bold py-2 fs-6 mb-0'>Permissions</p>
            <label className="form-label">Select Permissions Options</label>
            {options.map(option => (
                <div key={option} className="form-check">
                    <input
                        type="checkbox"
                        id={option}
                        value={option}
                        className="form-check-input"
                        onChange={handleChange}
                        checked={selectedOptions.includes(option)}
                        />
                    <label className="form-check-label" htmlFor={option}>
                        {option}
                    </label>
                </div>
            ))}
        </div>
        <Button type='submit'>Create Role</Button>
        </form>
        {
          roleData && roleData.length>0 ?
          <div className="container py-4">
            <h3>Top 5 Roles</h3>
            <ul className="list-group">
                {roleData.map(role => (
                  <li key={role._id} className="list-group-item">
                        <h5>{role.role_name.toUpperCase()}</h5>
                        <p><strong>Permissions:</strong> {role.permissions.join(", ")}</p>
                    </li>
                ))}
            </ul>
            </div>: <div className='py-2'><h4>Fetching top roles... </h4></div>
              }
      </div>
    </>
  )
};

export default ManageRoles;