import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { Document, DocumentResult } from './check-report.types';

export default async function checkReport(npm: string): Promise<DocumentResult> {
    const docRef = doc(db, 'students', npm);
    const docResult = await getDoc(docRef);

    if (!docResult.exists()) {
        return {
            empty: true,
            document: null,
        };
    } else {
        return {
            empty: false,
            document: docResult.data() as Document,
        };
    }
}
