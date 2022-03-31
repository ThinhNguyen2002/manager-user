import './Manage.scss'
import { useState, useEffect, useRef } from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import { deleteUser, updateUser } from 'actions/APICall'

function Manage(props) {
    let { listUser } = props
    const [users, setUsers] = useState([])
    const [isInput, setIsInput] = useState(false)
    const [isSortNum, setIsSortNum] = useState(true)
    const [nameUser, setNameUser] = useState('')
    const [birthday, setBirthday] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const currentUpdate = useRef(null)

    console.log('currentUpdate', currentUpdate.current)

    useEffect(() => {
        setUsers(listUser)
    }, [listUser])

    const handleDelete = id => {
        let newUsers = [...users]

        deleteUser(id).catch(() => {
            setUsers(newUsers)
        })

        const currIndex = listUser.findIndex(user => user.id === id)
        console.log(currIndex)
        newUsers.splice(currIndex, 1)
        setUsers(newUsers)
    }

    const handleOpentForm = (e,user) => {
        setIsInput(!isInput)
        setNameUser(user.name)
        setBirthday(user.birthday)

        e.target.parentElement.parentElement.classList.add('active')
    }

    const handleUpdate = (e, user) => {
        let newUser = { ...user, name: nameUser, birthday: birthday }
        setIsInput(!isInput)

        const curIndex = users.indexOf(user)
        users.splice(curIndex, 1, newUser)

        updateUser(user.id, newUser).catch(() => {
            setUsers(users)
        })

        e.target.parentElement.parentElement.classList.remove('active')
    }

    const handleNameChange = e => {
        setNameUser(e.target.value)
        console.log(nameUser)
    }

    const handleBriChange = e => {
        setBirthday(e.target.value)
    }

    const fillterUser = e => {
        let valueSearch = e.target.value
        setSearchQuery(valueSearch)
        if (valueSearch || valueSearch !== '') {
            valueSearch = valueSearch.trim().toLowerCase()
            let newarr = users.filter(function (item) {
                if (item.name.toLowerCase().indexOf(valueSearch) != -1) {
                    return item
                }
            })
            setUsers(newarr)
            console.log(newarr)
        }
        if (valueSearch === '') {
            setUsers(listUser)
        }
    }

    const handleSortNumber = () => {
        let newUsers = [...users]
        if (isSortNum) {
            newUsers.sort((a, b) => b.id - a.id)
            setIsSortNum(!isSortNum)
        }
        if (!isSortNum) {
            newUsers.sort((a, b) => a.id - b.id)
            setIsSortNum(!isSortNum)
        }

        setUsers(newUsers)
    }

    const handleSortText = () => {
        let newUsers = [...users]

        newUsers.sort(function (a, b) {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }

            return 0
        })

        setUsers(newUsers)
    }

    // const handleOne = e => {
    //     e.target.parentElement.parentElement.classList.add('active')
    // }

    return (
        <div className="manager-user">
            <h3>List user</h3>
            <div className="form-search">
                <Form.Control
                    className="input-search "
                    type="text"
                    placeholder="Search user"
                    name="search"
                    value={searchQuery}
                    onChange={fillterUser}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search icon"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
            <div className="wrap-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                #
                                <span
                                    className="sort"
                                    onClick={handleSortNumber}
                                >
                                    {isSortNum && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-sort-down"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                        </svg>
                                    )}
                                    {!isSortNum && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-sort-down-alt"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z" />
                                        </svg>
                                    )}
                                </span>
                            </th>
                            <th>
                                Username
                                <span className="sort" onClick={handleSortText}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-sort-down"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                    </svg>
                                </span>
                            </th>
                            <th>Birthday</th>
                            <th>Create at</th>
                            <th>Role</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody className="wrap-content-table">
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>{++i}</td>
                                <td>
                                    <div className="value-action">
                                        {user.name}
                                    </div>

                                    <input
                                        type="text"
                                        name="name-user"
                                        value={nameUser}
                                        onChange={handleNameChange}
                                    />
                                </td>

                                <td>
                                    <div className="value-action">
                                        {user.birthday}
                                    </div>

                                    <input
                                        type="text"
                                        name="birthday"
                                        value={birthday}
                                        onChange={handleBriChange}
                                    />
                                </td>
                                <td>{user.createdAt} </td>
                                <td>
                                    {user.role === 1
                                        ? 'Admin'
                                        : user.role === 2
                                        ? 'Manager'
                                        : user.role === 3
                                        ? 'User'
                                        : ''}
                                </td>
                                <td  >
                                    {!isInput && (
                                        <Button
                                            onClick={(e) => {
                                                handleOpentForm(e,user)
                                            }}
                                            size="sm"
                                            variant="outline-primary"
                                        >
                                            Update
                                            {isInput && 'Update now'}
                                        </Button>
                                    )}
                                    {isInput && (
                                        <Button
                                            onClick={e => {
                                                handleUpdate(e, user)
                                            }}
                                            size="sm"
                                            variant="outline-primary"
                                        >
                                            Update now
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            handleDelete(user.id)
                                        }}
                                        size="sm"
                                        variant="outline-danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td>
                                <b>Total</b>
                            </td>
                            <td colSpan={6}> {users.length} </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Manage
