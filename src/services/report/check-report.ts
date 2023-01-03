import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { Document, DocumentResult } from './check-report.types';

export default async function checkReport(npm: string): Promise<DocumentResult> {
    const q = query(collection(db, 'students'), where('npm', '==', npm));
    const result = await getDocs(q);

    if (result.empty) {
        return {
            empty: true,
            document: null,
        };
    } else {
        return {
            empty: false,
            document: result.docs[0].data() as Document,
        };
    }
}
