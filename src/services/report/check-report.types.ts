export interface DocumentResult {
    empty: boolean | null;
    document: Document | null;
}

export interface Document {
    partner: Partner;
    group: { [key: string]: Group };
    npm: string;
    lead: string;
}

export interface Group {
    npm: string;
    name: string;
    email: string;
    grade: string;
}

export interface Partner {
    name: string;
    address: string;
    files: Files;
}

export interface Files {
    responseLetter: Letter;
    coverLetter: Letter;
}

export interface Letter {
    fileName: string;
    url: string;
}
