import {Disease, Group} from "../../types/types";
import {Chip, ChipPropsColorOverrides, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";

interface TabPanelProps {
    disease: Disease,
    value: number,
    index: number,
}

function TabPanel({disease, value, index}: TabPanelProps) {

    const [tips, setTips] = useState<Group[]>([]);

    useEffect(() => {
        if(!disease) return;
        console.log(disease)
    }, [disease])

    return (
        <Box
             role="tabpanel"
             hidden={index !== value}
             id={`tab-panel-${disease.id}`}
             aria-labelledby={`tab-${disease.id}`}
        >
            <Box sx={{display:'flex', flexDirection:'column', gap:4}}>
                <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                    <Typography variant="h5">
                        {disease.name}
                    </Typography>
                    <Chip
                        sx={{fontSize:'15px', fontWeight:600}}
                        label={`${disease.distance}%`}
                        color={(disease.distance && disease.distance < 50) ? 'success' :
                            ((disease.distance && disease.distance > 75) ? 'error' : 'warning') }
                        size="small"
                    />

                </Box>
                <Box>
                    <Typography variant="h6" color='primary'>Описание</Typography>
                    <Typography maxWidth='1000px'>
                        {disease.description}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" color='primary'>Симптоматика</Typography>
                    <Typography maxWidth='1000px'>
                        {disease.symptomsDescription}
                    </Typography>
                </Box>
                <Box maxWidth='1000px'>
                    <Typography variant="h6" color="primary">Возможные причины возникновения</Typography>
                    <List>
                        {disease.reasons.map(tip => (
                            <ListItem key={tip.id}>
                                <ListItemIcon sx={{minWidth:30}}>
                                    <Add fontSize="small" color="primary"/>
                                </ListItemIcon>
                                <ListItemText>
                                    {tip.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box maxWidth='1000px'>
                    <Typography variant="h6" color="primary">Полезные советы</Typography>
                    <List>
                        {disease.tips.map(tip => (
                            <ListItem key={tip.id}>
                                <ListItemIcon sx={{minWidth:30}}>
                                    <Add fontSize="small" color="primary"/>
                                </ListItemIcon>
                                <ListItemText>
                                    {tip.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default TabPanel;