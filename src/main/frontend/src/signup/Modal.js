import React from 'react';
// import './Modal.scss';

const Modal = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{type === 'login' ? '로그인' : '회원가입'}</h2>
                <form>
                    {type === 'signup' && (
                        <input type="text" placeholder="이름" name="name" required />
                    )}
                    <input type="email" placeholder="이메일" name="email" required />
                    <input type="password" placeholder="비밀번호" name="password" required />
                    <button type="submit">{type === 'login' ? '로그인' : '회원가입'}</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
