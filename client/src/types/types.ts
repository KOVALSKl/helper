export type ApiErrorData = {
    message: string;
}

export type SendRequestProps<ObjectType> = {
    url: string;
    sendingData: ObjectType;
    requestType: RequestType;
    params?: any,
    headers?: any,
}

export enum RequestType {
    GET,
    POST,
    PUT,
    DELETE
}

export enum DiseaseTipType {
    TOEDIT,
    TOSHOW
}

export interface DiseaseSymptomsSample {
    id: number;
    name: string;
}

export class Symptom {
    public id: number;
    public name: string;
    public symptomsGroupId: number;

    constructor(symptom: Symptom) {
        this.id = symptom.id;
        this.name = symptom.name;
        this.symptomsGroupId = symptom.symptomsGroupId;
    }
}

export class SymptomsGroup {
    public id: number;
    public name: string;

    constructor(group: SymptomsGroup) {
        this.id = group.id;
        this.name = group.name;
    }
}

export class Disease {
    public id: number;
    public name: string;
    public description: string;
    public tips: DiseaseTip[];
    public distance: number | undefined;

    constructor(disease: Disease) {
        this.id = disease.id;
        this.name = disease.name;
        this.description = disease.description;
        this.tips = disease.tips;
        this.distance = disease.distance;
    }
}

export class DiseaseTip {
    public value: string;

    constructor(value?: string) {
        this.value = value ?? '';
    }
}

export class ApiError extends Error {
    public status: number;
    public statusText: string;
    public data: ApiErrorData;

    constructor(err: ApiError) {
        super();
        this.status = err.status;
        this.statusText = err.statusText;
        this.data = err.data;
    }

}

export type HookQueryType<ObjectType> = {
    data: ObjectType;
    isLoading: boolean;
    error: Error | null;
}


//PREVIEWS

export type ApiResponsePreview = Pick<ApiError, 'status' | 'statusText'>

export type SymptomPreview = Pick<Symptom, 'name' | 'symptomsGroupId'>;

export type DiseasePreview = {
    diseaseInfo: Pick<Disease, 'name' | 'description'>
    tips: string;
    symptoms: string;
}

export type GroupPreview = Omit<SymptomsGroup, 'id'>;