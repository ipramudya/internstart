import { db, storage } from '@/lib/firebase';
import { addDoc, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import {
    getDownloadURL,
    ref as firebaseStorageRef,
    uploadBytes,
    type UploadResult,
} from 'firebase/storage';
import type { InternFiles, Member, Company, UploadStorageRefs } from './add-submission.types';

interface AddSubmissionParams {
    files: InternFiles;
    member: Member[];
    company: Company;
}

export default async function addSubmission({ company, files, member }: AddSubmissionParams) {
    const uploadStorageRef: UploadStorageRefs = {
        coverLetterStorageRef: null as any,
        responseLetterStorageRef: null as any,
    };

    // creating storage ref
    (Object.keys(files) as (keyof InternFiles)[]).forEach((internFile) => {
        uploadStorageRef[`${internFile}StorageRef`] = firebaseStorageRef(
            storage,
            `${member[0].npm ?? 'temp'}/${files[internFile].fileName}`
        );
    });

    // creating upload bytes promises to solve
    const beforeUploadPromises: any[] = [];
    (Object.keys(files) as (keyof InternFiles)[]).forEach((upload) => {
        beforeUploadPromises.push(
            uploadBytes(
                uploadStorageRef[`${upload}StorageRef`] as NonNullable<
                    UploadStorageRefs[`${typeof upload}StorageRef`]
                >,
                files[upload].file as Blob
            )
        );
    });
    const uploadResult = await Promise.all<UploadResult>(beforeUploadPromises);

    // get download url promises
    const beforeGetDownloadURL: any[] = [];
    uploadResult.forEach((result) => {
        beforeGetDownloadURL.push(getDownloadURL(result.ref));
    });
    const downloadURL = await Promise.all<string>(beforeGetDownloadURL);

    // create reference
    const studentCollectionRef = collection(db, 'students');
    const docRef = doc(db, 'students', member[0].npm);

    // get existing data to check
    const existingDoc = await getDoc(docRef);

    // store to firestore
    if (existingDoc.exists()) {
        throw new Error('NPM telah digunakan');
    } else {
        await setDoc(doc(studentCollectionRef, member[0].npm), {
            lead: member[0].name,
            npm: member[0].npm,
            group: { ...member },
            partner: {
                ...company,
                files: {
                    coverLetter: {
                        fileName: files.coverLetter.fileName,
                        url: downloadURL[0],
                    },
                    responseLetter: {
                        fileName: files.responseLetter.fileName,
                        url: downloadURL[1],
                    },
                },
            },
        });
    }
}
