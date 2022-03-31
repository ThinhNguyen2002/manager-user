import './ListUser.scss'
import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function ListUser(props) {
    let { datas } = props
    console.log('datas', datas)
    const [users, setUsers] = useState([]) 

    useEffect(() => {
        setUsers(datas)
    }, [datas])


    return (
        <div className="wrap-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Create at</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((data, i) => (
                        <tr key={i}>
                            <td>{++i}</td>
                            <td>{data.name}</td>
                            <td>{data.birthday}</td>
                            <td>{data.gender}</td>
                            <td>{data.createdAt}</td>
                            <td>
                                {data.role === 1
                                    ? 'Admin'
                                    : data.role === 2
                                    ? 'Manager'
                                    : data.role === 3
                                    ? 'User'
                                    : ''}
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td>Total</td>
                        <td colSpan={5}> {users.length} </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ListUser
