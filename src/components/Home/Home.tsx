import { useEffect, useRef, useMemo, useState } from 'react'
import { UsersList } from '../User/UsersList'
import { User } from './typesList'

function Home() {

    const [users, setUsers] = useState<User[]>([])
    const [sortByName, setSortByName] = useState(false)
    const [filterName, setFilterName] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const originalUsers = useRef<User[]>([])

    const toggleSortByName = () => {
        setSortByName(prevState => !prevState)
    }

    useEffect(() => {
        setLoading(true)
        fetch(`https://randomuser.me/api/?results=12&seed=Mario&page=${currentPage}`)
            .then(async res => await res.json())
            .then(res => {
                setUsers(prevUsers => prevUsers.concat(res.results))
                originalUsers.current = res.results
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [currentPage])

    //Filtro busqueda de Usuarios
    const filteredUsers = useMemo(() => {
        console.log('filteredUsers')
        return filterName != null && filterName.length > 0 ?
            users.filter(user => {
                return user.name.first.toLowerCase().includes(filterName.toLowerCase())
            }) : users
    }, [users, filterName])

    //Ordenar Usuarios por Nombre
    const sortedUsers = useMemo(() => {
        console.log('sortedUsers')
        return sortByName
            ? filteredUsers.toSorted(
                (a, b) => a.name.first.localeCompare(b.name.first)
            ) : filteredUsers
    }, [filteredUsers, sortByName])

    //Eliminar Usuarios
    const handleDelete = (id: string) => {
        const filterUsers = users.filter((user) => user.login.uuid != id)
        setUsers(filterUsers)
    }

    //Resetear Lista de Usuarios
    const handleReset = () => {
        setUsers(originalUsers.current)
    }

    return (
        <div className='App'>
            <h2>Prueba técnica</h2>
            <header className='head-container'>
                <button onClick={toggleSortByName}>
                    {sortByName ? "No ordenar por nombre" : "Ordenar por nombre"}
                </button>
                <button onClick={handleReset}>
                    Reiniciar Lista
                </button>
                <input type='search' placeholder='Buscar usuario..' onChange={(e) => {
                    setFilterName(e.target.value)
                }} />
            </header>
            <div>
                {users.length > 0 && <UsersList deleteUser={handleDelete} users={sortedUsers} />}
                {loading && <strong>Cargando...</strong>}
                {!loading && <button onClick={() => setCurrentPage(currentPage + 1)}>Cargar más</button>}

            </div>
        </div>
    )
}

export default Home
