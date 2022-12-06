import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Symptom } from '../../types/types'

interface SelectedSymtpomsState {
    value: number[];
}

const initialState: SelectedSymtpomsState = {
    value: [],
}

export const selectedSymtpomsState = createSlice({
    name: 'selectedSymptoms',
    initialState,
    reducers: {
        addSymptom: (state, action: PayloadAction<number>) => {
            state.value.push(action.payload);
        },
        deleteSymptom: (state, action: PayloadAction<number>) => {
            const index = state.value.indexOf(action.payload);
            const sids = [...state.value];
            sids.splice(index, 1)
            state.value = sids
        },
        emptySymptoms: (state) => {
            state.value = [];
        }
    }
})

export const { addSymptom, deleteSymptom, emptySymptoms } = selectedSymtpomsState.actions;
export default selectedSymtpomsState.reducer;