import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default async function approveDocs(npm: string) {
    try {
        const docRef = doc(db, 'students', npm);
        const foundStudentDoc = await getDoc(docRef);

        if (!foundStudentDoc.exists()) {
            throw new Error('Data mahasiswa tidak ditemukan');
        } else {
            await updateDoc(docRef, { 'partner.approval': 'Disetujui' });
            return {
                success: 'Approval berhasil disetujui...',
                error: null,
            };
        }
    } catch (error: any) {
        console.error('error', error);
        return {
            success: null,
            error: error.message || 'Gagal merubah data approval',
        };
    }
}
