import type { StorageReference } from 'firebase/storage';

export type Member = {
    name: string;
    npm: string;
    grade: string;
    email: string;
};
export type Company = {
    name: string;
    address: string;
};
export type InternFiles = {
    coverLetter: {
        file: Blob | null;
        fileName: string;
    };
    responseLetter: {
        file: Blob | null;
        fileName: string;
    };
};
export type UploadStorageRefs = {
    coverLetterStorageRef: null | StorageReference;
    responseLetterStorageRef: null | StorageReference;
};
export type UploadHandlerParam = { file: FileList; slug: 'responseLetter' | 'coverLetter' };
