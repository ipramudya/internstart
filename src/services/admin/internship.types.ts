export interface InternshipDocs {
    lead: string;
    group: { [key: string]: Group };
    partner: Partner;
    npm: string;
}

export interface Group {
    name: string;
    grade: string;
    email: string;
    npm: string;
}

export interface Partner {
    name: string;
    files: Files;
    address: string;
    approval?: 'Disetujui' | 'Ditolak';
}

export interface Files {
    coverLetter: Letter;
    responseLetter: Letter;
}

export interface Letter {
    url: string;
    fileName: FileName;
}

export enum FileName {
    CoverLetterPDF = 'coverLetter.pdf',
    ResponseLetterPDF = 'responseLetter.pdf',
}
