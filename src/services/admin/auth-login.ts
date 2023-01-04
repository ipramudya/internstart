import { auth } from '@/lib/firebase';
import {
    browserSessionPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';

interface AuthLoginParam {
    email: string;
    password: string;
}

export default async function authLogin({ email, password }: AuthLoginParam) {
    try {
        await setPersistence(auth, browserSessionPersistence);
        const credential = await signInWithEmailAndPassword(auth, email, password);
        return {
            user: credential.user,
            error: '',
        };
    } catch (error: any) {
        console.log('err', error);
        return {
            user: null,
            error: error.message,
        };
    }
}
