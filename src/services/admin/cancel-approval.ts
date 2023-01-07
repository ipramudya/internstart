import { db } from '@/lib/firebase';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export default async function cancelApproval(npm: string) {
    try {
        const docRef = doc(db, 'students', npm);
        await updateDoc(docRef, { 'partner.approval': deleteField() });
        return {
            success: 'Pembatalan approval berhasil dilakukan...',
            error: null,
        };
    } catch (error: any) {
        return {
            success: null,
            error: error.message || 'Gagal membatalkan approval...',
        };
    }
}
