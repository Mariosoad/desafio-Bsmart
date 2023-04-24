import { type User } from '../Home/typesList'
import { Link } from "react-router-dom";
import './UsersList.css'

interface Props {
    deleteUser: (id: string) => void
    users: User[]
}

export function UsersList({ deleteUser, users }: Props) {
    return (
        <div className='container'>
            {
                users.map((user) => {
                    return (
                        <div className='container-user' key={user.login.uuid}>
                            <div className='child-container-user'>
                                <img width={100} height={100} src={user.picture.large} />
                                <p>{user.name.first} {user.name.last}</p>
                            </div>
                            <div className='child-container-buttons'>
                                <Link to={"/" + user.name.first + '-' + user.name.last} state={{ user }}> Ver perfil </Link>
                                <button onClick={() => { deleteUser(user.login.uuid) }}>Eliminar</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}