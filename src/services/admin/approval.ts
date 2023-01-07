import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface ApproveDocsParams {
    npm: string;
    variant: 'approve' | 'refuse';
}

const APPROVAL = {
    approve: 'Disetujui',
    refuse: 'Ditolak',
};

export default async function approveDocs({ npm, variant }: ApproveDocsParams) {
    try {
        const docRef = doc(db, 'students', npm);
        await updateDoc(docRef, { 'partner.approval': APPROVAL[variant] });
        return {
            success:
                variant === 'approve'
                    ? 'Approval berhasil disetujui...'
                    : 'Penolakan approval berhasil dilakukan...',
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
