import {Box} from "@mui/system";
import {SyntheticEvent, useState} from "react";
import {Tab, Tabs} from "@mui/material";
import {Disease} from "../../types/types";
import TabPanel from "./TabPanel";

interface DiseaseTabsProps {
    diseases: Disease[],
}
function DiseaseTabs({diseases}: DiseaseTabsProps) {
    const [value, setValue] = useState(0);

    const handleChange = (event:SyntheticEvent, newValue: number) => {
        setValue(newValue)
    };

    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:3, width:'100%'}}>
            <Tabs value={value} onChange={handleChange}>
                {diseases.map(disease => (
                    <Tab
                        key={disease.id}
                        label={disease.name}
                        id={`tab-${disease.id}`}
                        aria-controls={`tab-panel-${disease.id}`}
                    />
                ))}
            </Tabs>
            {diseases.map((disease, index) => (
                <TabPanel
                    disease={disease}
                    index={index}
                    value={value}
                    key={disease.id}/>
            ))}
        </Box>
    )
}

export default DiseaseTabs;