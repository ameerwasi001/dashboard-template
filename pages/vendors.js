import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout } from '../auth'
import {useRouter} from 'next/router'
import Dashboard from '../layouts/main'
import Table from '../layouts/table'

const CustomerList = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/admin/account/user/allVendors')
      .then(res => res.json())
      .then(users => setUsers(users.data))
  }, [])

  return Table("Vendors", users, ["", "Name", "Age", "Gender", "Balance"], [
    a => <img className='rounded-circle circle-rounded' style={{width: "50px", height: "50px"}} src={a.profilePicture}/>,
    a => a.fullname, 
    a => a.age, 
    a => a.gender,
    a => a.balance
  ])
}

export default function Home() {
  return Dashboard("New", <CustomerList/>)
}