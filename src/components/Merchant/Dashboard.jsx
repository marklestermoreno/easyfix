import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        signOut(auth).then(() => {

            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {

        });
    }
    return (
        <>
            <nav>
                <p>
                    Welcome Merchant
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Dashboard