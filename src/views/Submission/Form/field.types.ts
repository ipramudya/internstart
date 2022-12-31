export type Fields = {
    name: string;
    npm: string;
    grade: string;
    email: string;
};

export type InternFiles = {
    coverLetter: Blob | null;
    responseLetter: Blob | null;
};
export type UploadHandlerParam = { file: FileList; slug: 'responseLetter' | 'coverLetter' };
