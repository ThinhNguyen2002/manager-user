import './App.scss'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import AppBar from './components/AppBar/AppBar'
import SideNav from './components/SideNav/SideNav'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import Manage from './components/Manage/Manage'

import { getListUser } from 'actions/APICall'

function App() {
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        getListUser().then(data => {
            setListUser(data) 
        })
    }, [])

    // console.log('listUse2', listUser)
    return (
        <div className="app-container">
            <AppBar />
            <SideNav />
            <div className="wrap-content">
                <Routes>
                    <Route path="/" element={<Dashboard listUser={listUser} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/manage" element={<Manage listUser={listUser}/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App
