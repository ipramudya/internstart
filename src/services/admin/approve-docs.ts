import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function approveDocs(npm: string) {
    try {
        const docRef = doc(db, 'students', npm);
        await updateDoc(docRef, { 'partner.approval': 'Disetujui' });
        return {
            success: 'Approval berhasil disetujui...',
            error: null,
        };
    } catch (error: any) {
        console.error('error', error);
        return {
            success: null,
            error: error.message || 'Gagal merubah data approval',
        };
    }
}
