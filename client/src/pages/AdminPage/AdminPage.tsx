import { Link, Outlet } from "react-router-dom";
import {SnackbarProvider} from "notistack";
import './AdminPage.scss'

function AdminPage() {
    return (
        <SnackbarProvider>
            <div className="admin-page">
                <Outlet />
            </div>
        </SnackbarProvider>
    )
}

export default AdminPage;