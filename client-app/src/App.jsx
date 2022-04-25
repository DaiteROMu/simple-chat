import { useState } from 'react';

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import Lobby from './components/Lobby';
import Chat from './components/Chat';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useCurrentUser } from './CurrentUserContext';

const App = () => {
    const [connection, setConnection] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const { setCurrentUser } = useCurrentUser();

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:7056/chat')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on('ReceiveMessage', (user, message) => {
                setMessages((messages) => [...messages, { user, message }]);
            });

            connection.on('UsersInRoom', (users) => {
                setUsers(users);
            });

            connection.onclose((e) => {
                setConnection('');
                setMessages([]);
                setUsers([]);
                setCurrentUser('');
            });

            await connection.start();
            await connection.invoke('JoinRoom', { user, room });

            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    };

    const leaveRoom = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (message) => {
        try {
            await connection.invoke('SendMessage', message);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="app">
            <h2>My SignalR Chat</h2>
            <hr className="line" />
            {!connection ? (
                <Lobby joinRoom={joinRoom} />
            ) : (
                <Chat
                    users={users}
                    messages={messages}
                    sendMessage={sendMessage}
                    leaveRoom={leaveRoom}
                />
            )}
        </div>
    );
};

export default App;
