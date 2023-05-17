import {Link, useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import {Button} from "@mui/material";

function Home() {

    const navigate = useNavigate();

    return (
        <Box sx={{
            height:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:"center",
            gap: 5,
        }}
        >
            <h1>Администрирование</h1>
            <Box sx={{
                display: 'flex',
                alignItems:'center',
                gap: 4,
            }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <h3>Основные модели</h3>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/doctors')}
                    >
                        Доктора
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/symptoms')}
                    >
                        Симптомы
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/disease')}
                    >
                        Заболевания
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <h3>Модели групп</h3>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/groups/risks')}
                    >
                        Группы риска
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/groups/symptoms')}
                    >
                        Группы симптомов
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/groups/diseases')}
                    >
                        Группы заболеваний
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;