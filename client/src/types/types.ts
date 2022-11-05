export type ApiErrorData = {
    message: string;
}

export interface DiseaseSymptomsSample {
    id: number;
    name: string;
}

export class Symptom {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id ?? -1;
        this.name = name ?? '';
    }
}

export class Disease {
    public id: number;
    public name: string;
    public description: string;

    constructor(id?: number, name?: string, description?: string) {
        this.id = id ?? -1;
        this.name = name ?? '';
        this.description = description ?? 'Not found'
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