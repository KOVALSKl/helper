import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import {
    useAddDoctorMutation,
    useDeleteDoctorMutation,
    useGetDoctorsQuery,
    useUpdateDoctorMutation
} from "../../../redux/api/doctorsApi";
import {useNavigate} from "react-router-dom";
import {useGetDiseasesGroupsQuery} from "../../../redux/api/diseasesApi";
import {
    Accordion, AccordionDetails, AccordionSummary, Autocomplete,
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputLabel, List, ListItem, ListItemText, MenuItem,
    Select, SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Doctor, ApiResponse, Group} from "../../../types/types";

// ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DoctorsPage() {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [diseaseGroup, setDiseaseGroup] = useState<Group | null>(null);
    const [editID, setEditID] = useState<number>(-1);
    const [editing, setEditing] = useState<boolean>(false);

    const {data:doctors} = useGetDoctorsQuery();
    const {data:diseaseGroups} = useGetDiseasesGroupsQuery();

    const [addDoctor] = useAddDoctorMutation();
    const [updateDoctor] = useUpdateDoctorMutation();
    const [deleteDoctor] = useDeleteDoctorMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(editID < 0 || !doctors || !diseaseGroups) return;

        let {item:doctor, group} = doctors.filter(doctor => doctor.item.id === editID)[0]

        if (doctor && group) {
            setName(doctor.name);
            setDescription(doctor.description);
            setDiseaseGroup(group)
        }
    }, [editID])

    function submit() {
        if (!diseaseGroup) return;
        const doctor = {name, description, diseasesGroupId: diseaseGroup.id};
        if(editing && editID !== -1) {
            updateDoctor({id: editID, ...doctor} as Doctor);
        } else {
            addDoctor(doctor);
        }
        clear();
    }

    function clear() {
        setName('');
        setDescription('');
        setDiseaseGroup(null);
        setEditID(-1);
        setEditing(false);
    }

    function edit(id: number) {
        setEditing(true);
        setEditID(id);
    }

    const handleDiseaseGroupChange = (event:any, newValue: Group | null) => {
        setDiseaseGroup(newValue);
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
            <h1>Доктора</h1>
            <Box sx={{display:'flex', alignItems:'start', gap: 3}}>
                <Box sx={{
                    display:'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Card sx={{borderRadius:'20px', width:'400px'}} elevation={3}>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            gap:2}}>
                            <Typography variant="h5" color="primary">
                                {editing ? 'Изменение' : 'Добавление'} Типа
                                {!editing
                                    ? null
                                    : <IconButton onClick={clear}>
                                        <CloseIcon/>
                                    </IconButton>
                                }
                            </Typography>
                            <TextField
                                fullWidth
                                label="Название"
                                variant="outlined"
                                size="small"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            >
                            </TextField>
                            <Autocomplete
                                fullWidth
                                id="disease-group"
                                options={diseaseGroups ?? []}
                                value={diseaseGroup}
                                onChange={handleDiseaseGroupChange}
                                getOptionLabel={(option) => option.name ?? ""}
                                renderInput={(params) =>
                                    <TextField {...params} label="Группа болезней"/>
                                }
                            />
                            <TextField
                                fullWidth
                                multiline
                                label="Описание"
                                variant="outlined"
                                maxRows={10}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            >
                            </TextField>
                            <Button
                                fullWidth
                                variant="contained"
                                size="small"
                                onClick={submit}>
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
                <Card sx={{borderRadius:'20px', height:'400px', width:'400px'}} elevation={3}>
                    <CardContent sx={{
                        display:"flex",
                        flexDirection:'column',
                        height:'100%',
                        alignItems:'center',
                        gap:2
                    }}
                    >
                        <Typography variant="h5" color="primary">
                            Добавленные Типы
                        </Typography>
                        <Box sx={{height:'100%', width:'100%', overflowY:'auto'}}>
                            <Box sx={{
                                width:'100%',
                                padding: 1,
                            }}
                            >
                                {
                                    (doctors && doctors.length > 0)
                                        ? doctors.map(({item, group:itemGroup}:ApiResponse<Doctor>) => (
                                        <Accordion
                                            key={item.id}
                                            sx={{width:'100%'}}>
                                            <AccordionSummary
                                                sx={{display:'flex', alignItems:'center'}}
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Box sx={{display:'flex', alignItems:'center', gap: '2px'}}>
                                                    <Typography variant="h6">{item.name}</Typography>
                                                    <IconButton onClick={() => edit(item.id)}>
                                                        <EditIcon color="primary"/>
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteDoctor(item.id)}>
                                                        <DeleteOutlineIcon color="error"/>
                                                    </IconButton>
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{overflow:'hidden'}}>
                                                <List>
                                                    <ListItem disablePadding>
                                                        <ListItemText>
                                                            <Typography color='primary'>
                                                                Группа болезней
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            <Typography sx={{wordBreak: 'break-word'}}>
                                                                {itemGroup.name}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText>
                                                            <Typography color='primary'>
                                                                Описание
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            <Typography sx={{wordBreak: 'break-word'}}>
                                                                {item.description}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
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
export default DoctorsPage;
