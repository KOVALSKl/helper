import { Link, Outlet } from "react-router-dom";
import './AdminPage.scss'

function AdminPage() {
    return (
        <div className="admin-page">
            <Outlet />
        </div>
    )
}

export default AdminPage;