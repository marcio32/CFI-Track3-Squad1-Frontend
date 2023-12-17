import { useState } from 'react'
import { Button } from 'react-bootstrap';

import { Users } from '../../pages/Users';
import { Accounts } from '../../pages/Accounts';

import './adminRoute.css'


export const AdminRoute = () => {

    const [isUserSelected, setIsUserSelected ] = useState(true);

    const handleSelectAccounts = () => {
        setIsUserSelected(false)
    }

    const handleSelectUsers = () => {
        setIsUserSelected(true)
    }

    return (
        <>
        <main className='admin-page-main'>
            <section className='select-page-btn-group'>
                <Button onClick={handleSelectUsers}> Usuarios </Button>
                <Button onClick={handleSelectAccounts}> Cuentas </Button>
            </section>
            { isUserSelected ? <Users/> : <Accounts/> }
        </main>
        </>
    )
}