export interface DocumentResult {
    empty: boolean | null;
    document: Document | null;
}

export interface Document {
    lead: string;
    group: Group;
    partner: Partner;
    npm: string;
}

export interface Group {
    '0': The0;
}

export interface The0 {
    npm: string;
    grade: string;
    email: string;
    name: string;
}

export interface Partner {
    address: string;
    files: Files;
    name: string;
}

export interface Files {
    responseLetter: Letter;
    coverLetter: Letter;
}

export interface Letter {
    url: string;
    fileName: string;
}
