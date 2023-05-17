import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {ApiResponse, Group, Symptom} from "../../../types/types";

// ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    useAddSymptomMutation, useDeleteSymptomMutation,
    useGetSymptomsGroupsQuery,
    useGetSymptomsQuery,
    useUpdateSymptomMutation
} from "../../../redux/api/symptomsApi";

function SymptomsCrudPage() {

    const [name, setName] = useState<string>('');
    const [symptomsGroup, setSymptomsGroup] = useState<Group | null>(null);
    const [editID, setEditID] = useState<number>(-1);
    const [editing, setEditing] = useState<boolean>(false);


    const {data:symptoms} = useGetSymptomsQuery();
    const {data:symptomsGroups} = useGetSymptomsGroupsQuery();

    const [addSymptom] = useAddSymptomMutation();
    const [updateSymptom] = useUpdateSymptomMutation();
    const [deleteSymptom] = useDeleteSymptomMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(editID < 0 || !symptoms || !symptomsGroups) return;

        let {item:symptom, group} = symptoms.filter(symptom => symptom.item.id === editID)[0]

        if (symptom && group) {
            setName(symptom.name);
            setSymptomsGroup(group)
        }
    }, [editID])

    function submit() {
        if (!symptomsGroup) return;
        const symptom = {name, symptomsGroupId: symptomsGroup.id};
        if(editing && editID !== -1) {
            updateSymptom({id: editID, ...symptom} as Symptom);
        } else {
            addSymptom(symptom);
        }
        clear();
    }

    function clear() {
        setName('');
        setSymptomsGroup(null);
        setEditID(-1);
        setEditing(false);
    }

    function edit(id: number) {
        setEditing(true);
        setEditID(id);
    }

    const handleSymptomsGroupChange = (event:any, newValue: Group | null) => {
        setSymptomsGroup(newValue);
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
            <h1>Симптомы</h1>
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
                                {editing ? 'Изменение' : 'Добавление'} Симптома
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
                                options={symptomsGroups ?? []}
                                value={symptomsGroup}
                                onChange={handleSymptomsGroupChange}
                                getOptionLabel={(option) => option.name ?? ""}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) =>
                                    <TextField {...params} label="Группа симптомов"/>
                                }
                                ListboxProps={{style:{maxHeight:'200px'}}}
                            />
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
                            Добавленные Симптомы
                        </Typography>
                        <Box sx={{height:'100%', width:'100%', overflowY:'auto'}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection:'column',
                                justifyContent: 'center',
                                width:'100%',
                                padding: 1,
                            }}
                            >
                                {
                                    (symptoms && symptoms.length > 0) ?
                                        symptoms.map(({item, group:itemGroup}:ApiResponse<Symptom>) => (
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
                                                    <IconButton onClick={() => deleteSymptom(item.id)}>
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
export default SymptomsCrudPage;
