import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../ContextApi/Auth';
import UnAuthorised from '../Pages/UnAuthorised';

export default function PrivateRoute() {

    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        if (auth.token) { setOk(true); }
        else { setOk(false); }
    }, [auth.token])
    return ok ? <Outlet /> : <UnAuthorised />
}

