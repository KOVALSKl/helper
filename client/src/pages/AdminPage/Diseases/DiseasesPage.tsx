import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Accordion, AccordionSummary,
    Autocomplete,
    Button,
    Card,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, List, ListItem, ListItemText,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {ApiResponse, Disease, DiseaseApiResponse, Group, Symptom} from "../../../types/types";

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
import {
    useAddDiseaseMutation,
    useDeleteDiseaseMutation,
    useGetDiseasesGroupsQuery,
    useGetDiseasesQuery,
    useGetRisksGroupsQuery,
    useUpdateDiseaseMutation
} from "../../../redux/api/diseasesApi";

function DiseasesPage() {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tips, setTips] = useState<Group[]>([]);
    const [reasons, setReasons] = useState<Group[]>([]);
    const [symptomsDescription, setSymptomsDescription] = useState<string>('');
    const [diseaseGroup, setDiseaseGroup] = useState<Group | null>(null);
    const [diseaseRiskGroups, setDiseaseRiskGroups] = useState<Group[]>([]);
    const [editID, setEditID] = useState<number>(-1);
    const [editing, setEditing] = useState<boolean>(false);

    const [diseaseSymptoms, setDiseaseSymptoms] = useState<ApiResponse<Symptom>[]>([]);
    const [sortedSymptoms, setSortedSymptoms] = useState<ApiResponse<Symptom>[]>([]);

    const {data:diseases} = useGetDiseasesQuery();
    const {data:symptoms} = useGetSymptomsQuery();
    const {data:diseasesGroups} = useGetDiseasesGroupsQuery();
    const {data:riskGroups} = useGetRisksGroupsQuery();

    const [addDisease] = useAddDiseaseMutation();
    const [updateDisease] = useUpdateDiseaseMutation();
    const [deleteDisease] = useDeleteDiseaseMutation();

    const [tipsPopup, setTipsPopup] = useState<boolean>(false);
    const [reasonsPopup, setReasonsPopup] = useState<boolean>(false);
    const [reason, setReason] = useState<string>('');
    const [tip, setTip] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        if(!symptoms || symptoms.length === 0)
            return;
        setSortedSymptoms([...symptoms].sort((a, b) => (a.group.name > b.group.name) ? 1 : -1))
    }, [symptoms])

    useEffect(() => {
        if(editID < 0 || !symptoms || !diseasesGroups) return;

        let {item:symptom, group} = symptoms.filter(symptom => symptom.item.id === editID)[0]

        if (symptom && group) {
            setName(symptom.name);
            setDiseaseGroup(group)
        }
    }, [editID])

    function submit() {
        if (!diseaseGroup) return;

        const disease = {
            name,
            group: diseaseGroup.id,
            symptoms: diseaseSymptoms.map(item => item.item.id),
            risks: diseaseRiskGroups.map(item => item.id),
            description,
            tips: tips,
            reasons: reasons,
            symptomsDescription,
           };
        if(editing && editID !== -1) {
            updateDisease({id: editID, ...disease} as Disease);
        } else {
            addDisease(disease as Omit<Disease, 'id'>);
        }
        clear();
    }

    function clear() {
        setName('');
        setDescription('');
        setSymptomsDescription('');
        setDiseaseGroup(null);
        setTips([]);
        setReasons([]);
        setEditID(-1);
        setEditing(false);
    }

    function edit(id: number) {
        setEditing(true);
        setEditID(id);
    }

    const handleDiseaseGroupChange = (event: any, newValue: Group | null) => {
        setDiseaseGroup(newValue);
    }
    const handleSymptomsChange = (event:any, newValue: ApiResponse<Symptom>[]) => {
        setDiseaseSymptoms(newValue);
    }

    const handleDiseaseRiskGroupsChange = (event: any, newValue: Group[]) => {
        setDiseaseRiskGroups(newValue)
    }

    // POPUP'S
    const handleOpenReasons = () => {
        setReasonsPopup(true);
    }

    const handleCloseReasons = () => {
        setReasonsPopup(false);
        setReason('');
    }

    const handleAddReason = () => {
        if (reason !== '') {
            reasons.push({
                id: new Date().getTime(),
                name: reason
            });
            handleCloseReasons();
        } else return;
    }

    const handleReasonDelete = (id:number) => {
        setReasons(reasons.filter(item => item.id !== id))
    }

    const handleOpenTips = () => {
        setTipsPopup(true);
    }

    const handleCloseTips = () => {
        setTipsPopup(false);
        setTip('');
    }

    const handleAddTip = () => {
        if (tip !== '') {
            tips.push({
                id: new Date().getTime(),
                name: tip
            });
            handleCloseTips();
        } else return;
    }

    const handleTipDelete = (id:number) => {
        setTips(tips.filter(item => item.id !== id))
    }

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:"center",
            padding:3,
            gap: 4,
        }}
        >
            <h1>Заболевания</h1>
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
                                {editing ? 'Изменение' : 'Добавление'} Заболевания
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
                                size="small"
                                id="disease-group"
                                options={diseasesGroups ?? []}
                                value={diseaseGroup}
                                onChange={handleDiseaseGroupChange}
                                getOptionLabel={(option) => option.name ?? ""}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) =>
                                    <TextField {...params} label="Группа заболевания"/>
                                }
                            />
                            <Autocomplete
                                fullWidth
                                multiple
                                disableCloseOnSelect
                                size="small"
                                renderInput={(params) =>
                                    <TextField {...params} label="Симптомы заболевания"/>}
                                value={diseaseSymptoms}
                                onChange={handleSymptomsChange}
                                options={sortedSymptoms}
                                groupBy={(symptom) => symptom.group.name}
                                getOptionLabel={(symptom) => symptom.item.name}
                                ListboxProps={{style: {maxHeight: 240}}}
                            />
                            <Autocomplete
                                fullWidth
                                multiple
                                disableCloseOnSelect
                                size="small"
                                renderInput={(params) =>
                                    <TextField {...params} label="Группы риска"/>}
                                value={diseaseRiskGroups}
                                onChange={handleDiseaseRiskGroupsChange}
                                options={riskGroups ?? []}
                                getOptionLabel={(group) => group.name ?? ""}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                ListboxProps={{style: {maxHeight: 240}}}
                            />
                            <TextField
                                fullWidth
                                multiline
                                label="Описание заболевания"
                                variant="outlined"
                                maxRows={10}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></TextField>
                            <TextField
                                fullWidth
                                multiline
                                label="Появление и развитие симптоматики"
                                variant="outlined"
                                maxRows={10}
                                value={symptomsDescription}
                                onChange={e => setSymptomsDescription(e.target.value)}
                            ></TextField>
                            <List sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems:'center',
                            }}>
                                <ListItem disablePadding>
                                    <ListItemText sx={{textAlign:'center'}}>
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            Возможные причины заболевания
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                {reasons.map((reason) => {
                                    return (
                                        <ListItem
                                            key={reason.id}
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems:'center',
                                            }}
                                        >
                                            <ListItemText>
                                                <Typography>{reason.name}</Typography>
                                            </ListItemText>
                                                <IconButton onClick={() => handleReasonDelete(reason.id)}>
                                                    <DeleteOutlineIcon color="error"/>
                                                </IconButton>
                                        </ListItem>
                                    )
                                })}
                                <ListItem>
                                    <ListItemText sx={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'center'
                                    }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={handleOpenReasons}
                                        >
                                            добавить причину
                                        </Button>
                                    </ListItemText>
                                </ListItem>
                                <Dialog
                                    open={reasonsPopup}
                                    onClose={handleCloseReasons}
                                >
                                    <DialogTitle>Добавление причины</DialogTitle>
                                    <DialogContent sx={{width:'500px'}}>
                                        <TextField
                                            multiline
                                            maxRows={10}
                                            label="Возможная причина"
                                            fullWidth
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            sx={{marginTop:1}}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseReasons}>
                                            Отмена
                                        </Button>
                                        <Button onClick={handleAddReason} autoFocus>
                                            Добавить
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </List>
                            <List sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems:'center',
                            }}>
                                <ListItem disablePadding>
                                    <ListItemText sx={{textAlign:'center'}}>
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            Полезные советы по лечению
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                {tips.map((tip) => {
                                    return (
                                        <ListItem key={tip.id}>
                                            <ListItemText sx={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems:'center',
                                            }}
                                            >
                                                <Typography>{tip.name}</Typography>
                                            </ListItemText>
                                            <IconButton onClick={() => handleTipDelete(tip.id)}>
                                                <DeleteOutlineIcon color="error"/>
                                            </IconButton>
                                        </ListItem>
                                    )
                                })}
                                <ListItem>
                                    <ListItemText sx={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'center'
                                    }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={handleOpenTips}
                                        >
                                            добавить совет
                                        </Button>
                                    </ListItemText>
                                </ListItem>
                                <Dialog
                                    open={tipsPopup}
                                    onClose={handleCloseTips}
                                >
                                    <DialogTitle>Добавление совета</DialogTitle>
                                    <DialogContent sx={{width:'500px'}}>
                                        <TextField
                                            multiline
                                            maxRows={10}
                                            label="Полезный совет"
                                            fullWidth
                                            value={tip}
                                            onChange={(e) => setTip(e.target.value)}
                                            sx={{marginTop:1}}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseTips}>
                                            Отмена
                                        </Button>
                                        <Button onClick={handleAddTip} autoFocus>
                                            Добавить
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </List>
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
                <Card sx={{borderRadius:'20px', height:'100%', width:'600px'}} elevation={3}>
                    <CardContent sx={{
                        display:"flex",
                        flexDirection:'column',
                        height:'100%',
                        alignItems:'center',
                        gap:2
                    }}
                    >
                        <Typography variant="h5" color="primary">
                            Добавленные Заболевания
                        </Typography>
                        <Box sx={{height:'100%', width:'100%', overflowY:'auto'}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection:'column',
                                alignItems: 'center',
                                width:'100%',
                                padding: 1,
                            }}
                            >
                                {
                                    (diseases && diseases.length > 0) ?
                                        diseases.map(({item, group:itemGroup}:DiseaseApiResponse) => (
                                            <Accordion key={item.id} sx={{width:"100%"}}>
                                                <AccordionSummary
                                                    sx={{display:'flex', alignItems:'center'}}
                                                    expandIcon={<ExpandMoreIcon/>}
                                                >
                                                    <Box sx={{display:'flex', alignItems:'center', gap:'2px'}}>
                                                        <Typography variant="h6">{item.name}</Typography>
                                                        <Box sx={{display:'flex', alignItems:'center'}}>
                                                            <IconButton onClick={() => edit(item.id)}>
                                                                <EditIcon color="primary"/>
                                                            </IconButton>
                                                            <IconButton onClick={() => deleteDisease(item.id)}>
                                                                <DeleteOutlineIcon color="error"/>
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </AccordionSummary>
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
export default DiseasesPage;
