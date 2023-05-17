import {Box} from "@mui/system";
import {Button, Card, CardContent, IconButton, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Group} from "../../../../types/types";

// ICONS
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    useAddRisksGroupMutation,
    useDeleteRisksGroupMutation,
    useGetRisksGroupsQuery,
    useUpdateRisksGroupMutation
} from "../../../../redux/api/diseasesApi";

function RisksGroupPage() {

    const [name, setName] = useState<string>('');
    const [editID, setEditID] = useState<number>(-1);
    const [editing, setEditing] = useState<boolean>(false);

    const {data} = useGetRisksGroupsQuery();
    const [addGroup] = useAddRisksGroupMutation();
    const [updateGroup] = useUpdateRisksGroupMutation();
    const [deleteGroup] = useDeleteRisksGroupMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(editID < 0 || !data) return;

        let group = data.filter(item => item.id === editID)
        if (group.length > 0) {
            setName(group[0].name);
        }
    }, [editID])

    function submit() {
        const group = {id: editID, name} as Group;
        if(editing) {
            updateGroup(group);
        } else {
            addGroup(group);
        }
        clear();
    }

    function clear() {
        setName('');
        setEditID(-1);
        setEditing(false);
    }

    function edit(id: number) {
        setEditing(true);
        setEditID(id);
    }

    return (
        <Box sx={{
            height: "100%",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:"center",
            gap: 4,
        }}
        >
            <Box sx={{display:'flex', alignItems:'center', gap: 3}}>
                <Box sx={{
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent:'center',
                    gap: 2,
                }}>
                    <Card sx={{borderRadius:'20px'}} elevation={3}>
                        <CardContent sx={{display: 'flex', flexDirection:'column', gap:2}}>
                            <Typography variant="h5" color="primary">
                                {editing ? 'Изменение' : 'Добавление'} Группы Риска
                                {!editing
                                    ? null
                                    : <IconButton onClick={clear}>
                                        <CloseIcon/>
                                    </IconButton>
                                }
                            </Typography>
                            <TextField
                                label="Название группы"
                                variant="outlined"
                                size="small"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            >
                            </TextField>
                            <Button variant="contained" size="small" onClick={submit}>
                                {editing ? 'Изменить' : 'Добавить'}
                            </Button>
                        </CardContent>
                    </Card>
                    <Button
                        color="secondary"
                        variant="text"
                        size="medium"
                        sx={{borderRadius:'20px'}}
                        startIcon={<ArrowBackIcon/>}
                        onClick={() => navigate('/admin')}
                    >
                        вернуться на главную
                    </Button>
                </Box>
                <Card sx={{borderRadius:'20px', height:'400px'}} elevation={3}>
                    <CardContent sx={{
                        display:"flex",
                        flexDirection:'column',
                        height:'100%',
                        alignItems:'center',
                        gap:2
                    }}
                    >
                        <Typography variant="h5" color="primary">
                            Добавленные Группы Риска
                        </Typography>
                        <Box sx={{height:'100%', width:'100%', overflowY:'auto'}}>
                            <Box sx={{
                                width:'100%',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                gap:2,
                            }}
                            >
                                {
                                    (data && data.length > 0) ? data.map((item:Group) => (
                                        <Box sx={{
                                            width:'100%',
                                            display: 'flex',
                                            alignItems:'center',
                                            justifyContent:'space-between',
                                        }}
                                             key={item.id}
                                        >
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Box sx={{display:'flex', alignItems:'center'}}>
                                                <IconButton onClick={() => edit(item.id)}>
                                                    <EditIcon color="primary"/>
                                                </IconButton>
                                                <IconButton onClick={() => deleteGroup(item.id)}>
                                                    <DeleteOutlineIcon color="error"/>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )) : <Typography variant="h6">Здесь пусто</Typography>
                                }
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default RisksGroupPage;