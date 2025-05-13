'use server';
import { auth } from './auth';
import { headers } from "next/headers";

export const authGaurd = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return {
            status: 401,
            message: 'Unauthorized',
        };
    }

    return session;
};