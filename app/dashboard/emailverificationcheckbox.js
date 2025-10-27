"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useLoading } from '@/context/LoadingContext'

const EmailVerificationCheckbox = () => {
    const { loading, setLoading } = useLoading();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "authenticated" || !session) return;
        const getUser = async () => {

            try {
                setLoading(true);
                const res = await fetch(`/api/getuser?userid=${session.user.id}`);
                const data = await res.json();
                if (!data.isverified && data.provider === "credentials") {
                    const dialog = document.getElementById('my_modal_1');
                    if (dialog) dialog.showModal();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getUser();

    }, [status, session, setLoading]);

    return (
        <>
            <dialog id="my_modal_1" className="modal text-white modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Alert</h3>
                    <p className="py-4">Verify Your Email First</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default EmailVerificationCheckbox;
