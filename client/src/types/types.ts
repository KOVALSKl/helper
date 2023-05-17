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

export interface GroupedItems<T> {
    group: Group,
    items: T[],
}

export interface Symptom {
    id: number,
    name: string,
    symptomsGroupId: number,
}

export interface Disease {
    id: number,
    group: number,
    name: string,
    description: string,
    tips: Group[],
    reasons: Group[],
    symptomsDescription: string,
    distance?: number,
}

export interface Doctor {
    id: number,
    name: string,
    description: string,

    diseasesGroupId: number,
}
export interface Group {
    id: number,
    name: string,
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

// API
export interface ApiResponse<T> {
    item: T,
    group: Group,
}

export interface DiseaseApiResponse {
    item: Disease,
    group: Group,
    symptoms: Symptom[],
}

//PREVIEWS

export type ApiResponsePreview = Pick<ApiError, 'status' | 'statusText'>

export type SymptomPreview = Omit<Symptom, 'id'>;

export type DiseasePreview = {
    diseaseInfo: Pick<Disease, 'name' | 'description'>
    tips: string;
    symptoms: string;
}

