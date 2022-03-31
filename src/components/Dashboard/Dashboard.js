import './Dashboard.scss'
import { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ListUser from 'components/ListUser/ListUser'
import { getListUser } from 'actions/APICall'

function Dashboard(props) {
    let { listUser } = props

    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState([])
    const [mannager, setMannager] = useState([])
    const [register, setRegister] = useState([])

    useEffect(() => {
        setUsers(listUser)
    }, [listUser])

    console.log(users)

    useEffect(() => {
        users.forEach(user => {
            if (user.role * 1 === 1) {
                setAdmin([...admin, user])
            }
            if (user.role === 2) {
                setMannager([...mannager, user])
            }
            if (user.role === 3) {
                setRegister([...register, user])
            }
        })
    }, [users])

    console.log('admin', admin)

    return (
        <div className="Dashboard">
            <h3>User management list.</h3>
            <Tabs
                defaultActiveKey="admin"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="admin" title="Admin">
                    <ListUser datas={admin} />
                </Tab>
                <Tab eventKey="manger" title="Manger">
                    <ListUser datas={mannager} />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <ListUser datas={register} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Dashboard
