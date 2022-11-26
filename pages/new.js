import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout } from '../auth'
import {useRouter} from 'next/router'
import Dashboard from '../layouts/main'

const CustomerList = () => {

}

export default function Home() {
  return Dashboard("Dashbaord", <p>Hello</p>)
}