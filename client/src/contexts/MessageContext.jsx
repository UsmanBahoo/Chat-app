import {createContext} from 'react';
import { io } from 'socket.io-client';

const MessageContext = createContext();

export const MessageProvider = ({children}) => {


    function sendMessage(message) {
        io.emit('send-message', message);
    }

    <MessageContext.Provider value={{sendMessage}}>
        {children}
    </MessageContext.Provider>
}

export default MessageContext;