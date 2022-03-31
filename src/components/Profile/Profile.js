import './Profile.scss'
import { useState } from 'react'
import { createUser } from 'actions/APICall'

function Profile() {
    const [nameUser, setNameUser] = useState('')
    const [genderUser, setGenderUser] = useState('')
    const [birUser, setBirUser] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        let d = new Date()
        let day = d.getDay()
        let month = d.getMonth()
        let year = d.getFullYear()

        let data = {
            name: nameUser,
            birthday: birUser,
            gender: genderUser,
            createdAt: `${day}/${month}/${year}`,
            role: 3,
        }

        createUser(data)

        setNameUser('')
        setGenderUser('')
        setBirUser('')

        console.log(data)
    }

    const valueNameChage = e => {
        setNameUser(e.target.value)
        console.log(nameUser)
    }
    const valueGender = e => {
        setGenderUser(e.target.value)
        console.log(genderUser)
    }
    const valueBirthday = e => {
        setBirUser(e.target.value)
        console.log(birUser)
    }

    return (
        <div className="profile-page">
            <section className="get-in-touch">
                <h1 className="title">Create new user</h1>
                <form className="contact-form row">
                    <div className="form-field col-lg-6">
                        <label className="title-input">Name</label>
                        <input
                            id="name"
                            className="input-text js-input"
                            type="text"
                            value={nameUser}
                            name="nameUser"
                            required
                            onChange={valueNameChage}
                        />
                    </div>
                    <div className="form-field col-lg-6 ">
                        <label className="title-input">Email</label>
                        <input
                            id="email"
                            className="input-text js-input"
                            type="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="form-field col-lg-6 ">
                        <label className="title-input">Gender</label>
                        <input
                            id="company"
                            className="input-text js-input"
                            value={genderUser}
                            type="text"
                            required
                            name="genderUser"
                            onChange={valueGender}
                        />
                    </div>
                    <div className="form-field col-lg-6 ">
                        <label className="title-input">Birthday</label>
                        <input
                            id="phone"
                            className="input-text js-input"
                            value={birUser}
                            type="text"
                            required
                            name="birUser"
                            onChange={valueBirthday}
                        />
                    </div>
                    <div className="form-field col-lg-12">
                        <input
                            className="submit-btn"
                            type="submit"
                            value="Submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Profile
