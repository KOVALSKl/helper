import { Link } from "react-router-dom";
import './HomeAdminPage.scss'

function HomeAdminPage() {
    return (
        <div className="home-admin-page">

            <h1>helper admin</h1>

            <div className="action-links">
                <Link to='/admin/disease'>add disease</Link>
                <Link to='/admin/symptom'>add symptom</Link>
                <Link to='/admin/group'>add group</Link>
            </div>
        </div>
    );
}

export default HomeAdminPage;