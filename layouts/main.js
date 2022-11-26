import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout } from '../auth'
import {useRouter} from 'next/router'
import Layout from '../layouts/dashboard'

export default function Dashboard(title, content) {
  return Layout(
    title, 
    [
      {text: "Customers", link: "/"}, 
      {text: "Vendors", link: "/vendors"},
      {text: "Disputes", link: "/disputes"},
    ], 
    content
  )
}