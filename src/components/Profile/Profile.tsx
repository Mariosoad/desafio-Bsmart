import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './profile.css'

export default function Profile() {

  const location = useLocation()
  const [userData, setUserData] = useState(location != null && location.state.user)

  return (
    <div className='profile'>
    <h2>Prueba técnica</h2>
      <div className='child-profile'>
        <div className='back-ruta'>
          <Link to="/">Volver</Link>
        </div>
        <div className='container-profile'>
          <img width={200} height={200} src={userData.picture.large} />
          <div>
            <h2>{userData.name.first + ' ' + userData.name.last}</h2>
            <p><strong>Información personal</strong></p>
            <p>{userData.location.country + ' - ' + userData.location.city}</p>
            <p>{userData.location.street.name + ' ' + userData.location.street.number}</p>
            <p>{userData.dob.age} años</p>
            <p>{userData.email}</p>
            <p>{userData.cell}</p>

            <p><strong>Información de usuario</strong></p>
            <p><strong>ID</strong>: {userData.login.uuid}</p>
            <p><strong>Username:</strong> {userData.login.username}</p>
            <p><strong>Contraseña:</strong> {userData.login.password}</p>

          </div>
        </div>
      </div>
    </div>
  )
}
