import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default async function authLogout() {
    try {
        await signOut(auth);
        return {
            message: 'Logout berhasil',
            error: '',
        };
    } catch (error: any) {
        console.log('err', error);
        return {
            message: error.message,
            error: error.code,
        };
    }
}
