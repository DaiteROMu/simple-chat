import React from 'react';

import { useCurrentUser } from '../CurrentUserContext';

const Message = ({ user, message }) => {
    const { currentUser } = useCurrentUser();

    return (
        <div
            className={`user-message ${
                user == currentUser ? 'user-message-own' : ''
            }`}
        >
            <div className="message">{message}</div>
            <div className="from-user">{user}</div>
        </div>
    );
};

export default Message;
