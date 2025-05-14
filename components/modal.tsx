'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, description, children, footer }: ModalProps) => {
    return (
            <Dialog open={isOpen} onOpenChange={onClose} >
                <DialogContent className='z-[9999] max-h-screen overflow-y-auto'>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    <div className="mt-4 ">{children}</div>
                    {footer && <DialogFooter>{footer}</DialogFooter>}
                </DialogContent>
            </Dialog>
    );
};

export default Modal;