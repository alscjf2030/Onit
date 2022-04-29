import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {setClient} from "./shared/api/client";

function App() {

    useEffect(() => {
        const token = localStorage.getItem('jwt-token')
        if (token) {
            setClient(token)
        }
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </div>

    );
}

export default App;
