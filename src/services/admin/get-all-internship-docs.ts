import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { reactive, ref } from 'vue';
import type { InternshipDocs } from './internship.types';

export default function getAllInternshipDocs() {
    const loading = ref(false);
    const internshipDocs: InternshipDocs[] = reactive([]);

    const q = query(collection(db, 'students'));
    loading.value = true;
    const unsubscribe = onSnapshot(q, (docs) => {
        docs.forEach((doc) => {
            const existingDoc = internshipDocs.find(
                (internshipDoc) => internshipDoc.npm === doc.data().npm
            );
            if (existingDoc) {
                return (existingDoc.partner.approval = doc.data().partner.approval);
            }
            internshipDocs.push(doc.data() as any);
        });
        loading.value = false;
    });

    return { internshipDocs, loading, unsubscribe };
}
