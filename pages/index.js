import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout } from '../auth'
import {useRouter} from 'next/router'
import Dashboard from '../layouts/main'
import {TableView} from '../layouts/table'
import env from '../env'

const CustomerList = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${env.url}/admin/account/user/allCustomers`)
      .then(res => res.json())
      .then(users => {console.log("<<=>>", users.data), setUsers(users.data)})
  }, [])

  return <TableView
    data={users} 
    fields={["", "Name", "Age", "Gender"]} 
    accessors={[
      a => <img className='rounded-circle circle-rounded' style={{width: "50px", height: "50px"}} src={a.profilePicture}/>,
      a => a.fullname, 
      a => a.age, 
      a => a.gender,
    ]} listingType={"Customers"}/>
}

export default function Home() {
  return Dashboard("New", <CustomerList/>)
}