import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './Routes/AuthRoutes.js';
import { ConnectDB } from './Helper/DB.js';
import cookieParser from 'cookie-parser';
import ServiceRoutes from './Routes/ServiceRoutes.js';
import CategoryRoutes from './Routes/CategoryRoutes.js';
import VoucherRoutes from './Routes/VoucherRoutes.js';
import { Server } from 'socket.io';
import { connectedUsers } from '../client/src/connectedUsers.js';

const app = express();

dotenv.config();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/services/', ServiceRoutes);
app.use('/api/v1/category/', CategoryRoutes);
app.use('/api/v1/voucher/', VoucherRoutes);




const expressServer = app.listen(process.env.PORT || 8080, () => {
    ConnectDB();
    console.log("Server is running");
});
export const io = new Server(expressServer, { cors: {}});


io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    io.on('disconnect', () => {
        console.log('User disconnected');
    });
     socket.on('update', (data) => {
        console.log('Server Received hello event:', data);
        connectedUsers[data] = socket;
        // Emit a response event
        socket.broadcast.emit('response', 'Hello, client!');
    });
});
