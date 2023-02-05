import { Link } from "react-router-dom";
import './HomeAdminPage.scss'

function HomeAdminPage() {
    return (
        <div className="home-admin-page">

            <h1>helper admin</h1>

            <div className="action-links">
                <Link to='/admin/disease'>добавить заболевание</Link>
                <Link to='/admin/symptom'>добавить симптом</Link>
                <Link to='/admin/group'>добавить группу симптомов</Link>
            </div>
        </div>
    );
}

export default HomeAdminPage;