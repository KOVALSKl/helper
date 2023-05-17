import './DiagnosesPage.scss'
import { SyncLoader } from 'react-spinners';
import { useGetDiagnoseQuery } from '../../hooks/useGetDiagnoseQuery';
import React, { useEffect, useState } from 'react';
import { Disease } from '../../types/types';
import {useNavigate} from 'react-router-dom';
import {Box} from "@mui/system";
import {
    Button,
    Typography
} from "@mui/material";
import DiseaseTabs from "../../components/DiseaseTabs/DiseaseTabs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DiagnosisPage() {

    const { data, isLoading } = useGetDiagnoseQuery();
    const [diseasesList, setDiseasesList] = useState<Disease[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data)
            setDiseasesList(data.map((item:Disease) => item as Disease))
    }, [data])

    return (
        <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
            {(isLoading || diseasesList.length === 0)
                ? <Box sx={{
                    height:'100%',
                    display:"flex",
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    gap: 2,
                }}>
                    <SyncLoader color='#14a433' />
                    <span>диагностируем</span>
                </Box>
                :<Box sx={{display:'flex', width:'100%', flexDirection:'column', gap: 4, padding:4}}>
                        <Typography variant='h4' fontWeight={600} color="primary">Вероятные диагнозы</Typography>
                        <Box>
                            <DiseaseTabs diseases={diseasesList}/>
                        </Box>
                        <Button
                            color="secondary"
                            variant="text"
                            size="medium"
                            sx={{borderRadius:'20px'}}
                            startIcon={<ArrowBackIcon/>}
                            onClick={() => navigate('/symptoms')}
                        >
                            вернуться к симптомам
                        </Button>
                </Box>}
        </Box>
    );
}

export default DiagnosisPage;