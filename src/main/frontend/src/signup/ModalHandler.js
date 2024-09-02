import React, { useState } from 'react';
import Modal from './Modal';

const ModalHandler = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');

    const openModal = (modalType) => {
        setType(modalType);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    window.openLoginModal = () => openModal('login');
    window.openSignupModal = () => openModal('signup');

    return (
        <div>
            <Modal isOpen={isOpen} onClose={closeModal} type={type} />
        </div>
    );
};

export default ModalHandler;
