import { Link, useNavigate } from 'react-router-dom'
import { Box } from '@mui/system';
import {
    Autocomplete, Button, Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent, TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Symptom, ApiResponse} from '../../types/types';

import {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {symptomsApi, useGetSymptomsGroupsQuery, useGetSymptomsQuery} from '../../redux/api/symptomsApi';
import {updateSymptoms} from "../../redux/slices/selectedSymtpomsSlice";

function SymptomsPage() {

    const navigate = useNavigate();

    const { data: groups } = useGetSymptomsGroupsQuery();
    const { data: apiSymptoms} = useGetSymptomsQuery();

    const dispatch = useAppDispatch();

    const [symptoms, setSymptoms] = useState<ApiResponse<Symptom>[]>([]);
    const [sortedSymptoms, setSortedSymptoms] = useState<ApiResponse<Symptom>[]>([]);

    const ListboxProps = {
        style: {
            height:240,
        }
    }

    useEffect(() => {
        if (!groups || !apiSymptoms)
            return;
        setSortedSymptoms([...apiSymptoms].sort((a, b) => (a.group.name > b.group.name) ? 1 : -1))
    }, [apiSymptoms, groups])

   useEffect(() => {
       dispatch(updateSymptoms(symptoms.map(symptom => symptom.item.id)))
   }, [symptoms])

    const handleChange = (event: any, newValue: ApiResponse<Symptom>[]) => {
        setSymptoms(newValue)
    }

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '40px',
        }}>
            <Box sx={{textAlign:'center'}}>Выбери подходящие симптомы <br /> (просто кликни на нужные)</Box>
            <Autocomplete
                multiple
                disableCloseOnSelect
                disableListWrap
                size="small"
                renderInput={(params) => <TextField {...params} label="Симптомы"/>}
                value={symptoms}
                onChange={handleChange}
                options={sortedSymptoms}
                groupBy={(symptom) => symptom.group.name}
                getOptionLabel={(symptom) => symptom.item.name}
                sx={{ m: 1, width: 400}}
                ListboxProps={ListboxProps}
            />
            <Box sx={{display:'flex', alignItems:'center', gap: 2}}>
                <Button
                    color="secondary"
                    variant="text"
                    size="medium"
                    sx={{borderRadius:'20px'}}
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => navigate('/')}
                >
                    назад
                </Button>
                <Button
                    disabled={symptoms.length < 3}
                    variant="contained"
                    size="medium"
                    sx={{borderRadius:'20px'}}
                    onClick={() => navigate('/diagnoses')}
                >
                    продолжить
                </Button>
            </Box>
        </Box>
    );
}

export default SymptomsPage;