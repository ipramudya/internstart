import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { InternshipDocs } from './internship.types';

export default async function getAllInternshipDocs() {
    const docSnapsnots = await getDocs(collection(db, 'students'));

    const internshipDocs: InternshipDocs[] = [];
    docSnapsnots.forEach((doc) => {
        internshipDocs.push(doc.data() as any);
    });

    return { internshipDocs };
}
