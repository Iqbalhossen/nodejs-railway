const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const database = require('./config/database');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser')
database();
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000",

// }));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const http = require('http');
const server = http.createServer(app);

app.use("/public/data/uploads/", express.static("./public/data/uploads/"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

require('./commonfile/LoanCron/LoanCron');
require('./commonfile/TradeLogCron/TradeLogCron');
require('./commonfile/PracticeTradeLogCron/PracticeTradeLogCron');

// admin route middleware 
const adminHomeRoute = require('./routes/admin/Frontend/FrontendRoutes');
const adminUserRoute = require('./routes/admin/User/userRoutes');
const adminMenuPageRoute = require('./routes/admin/Frontend/MenuPageRoutes');
const adminSiteSettingRoute = require('./routes/admin/Setting/SiteSettingRoutes');
const adminManualGatewaysRoute = require('./routes/admin/PaymentGateways/ManualGatewaysRoute');
const adminCryptoCurrencyRoute = require('./routes/admin/CryptoCurrency/CryptoCurrencyRoutes');
const adminThradeSettingRoute = require('./routes/admin/ThradeSetting/ThradeSettingRoute');
const adminDepositRoute = require('./routes/admin/Deposits/DepositsRoute');
const adminTradeLogRoute = require('./routes/admin/TradeLog/TradeLogRoute');
const adminPracticeTradeLogRoute = require('./routes/admin/PracticeTradeLog/PracticeTradeLogRoute');
const adminWithdrawalRoute = require('./routes/admin/Withdrawal/WithdrawalRoute');
const adminKYCRoute = require('./routes/admin/KYC/KYCRoute');
const adminRoleRoute = require('./routes/admin/Admin/AdminRoutes');
const adminUserTradeLogRoute = require('./routes/admin/User/userTradeLogRoutes');
const adminUserTransactionsRoute = require('./routes/admin/Transactions/TransactionsRoutes');
const adminSubscriberManagerRoutes = require('./routes/admin/SubscriberManager/SubscriberManagerRoutes');
const adminSupportTicketsRoutes = require('./routes/admin/SupportTickets/SupportTicketsRoutes');
const adminReportRoutes = require('./routes/admin/Report/ReportRoutes');
const adminFixedDepositRoutes = require('./routes/admin/FixedDeposit/FixedDepositRoutes');
const adminMiningRoutes = require('./routes/admin/Mining/MiningRoutes');
const adminLoanRoutes = require('./routes/admin/Loan/LoanRoutes');
const adminLiveChatsRoutes = require('./routes/admin/LiveChats/LiveChatsRoutes');


///////////// admin route 
app.use('/api/admin/home', adminHomeRoute);
app.use('/api/admin/user/view', adminUserRoute);
app.use('/api/admin/menu/page', adminMenuPageRoute);
app.use('/api/admin/site/setting', adminSiteSettingRoute);
app.use('/api/admin/gateway/manual', adminManualGatewaysRoute);
app.use('/api/admin/crypto/currency', adminCryptoCurrencyRoute);
app.use('/api/admin/trade/setting', adminThradeSettingRoute);
app.use('/api/admin/deposit', adminDepositRoute);
app.use('/api/admin/trade/log', adminTradeLogRoute);
app.use('/api/admin/practice/trade/log', adminPracticeTradeLogRoute);
app.use('/api/admin/withdrawal', adminWithdrawalRoute);
app.use('/api/admin/kyc', adminKYCRoute);
app.use('/api/admin', adminRoleRoute);
app.use('/api/admin/user/trade/log', adminUserTradeLogRoute);
app.use('/api/admin/user/transactions', adminUserTransactionsRoute);
app.use('/api/admin/subscriber/manager', adminSubscriberManagerRoutes);
app.use('/api/admin/support/tickets', adminSupportTicketsRoutes);
app.use('/api/admin/report', adminReportRoutes);
app.use('/api/admin/fixed/deposit', adminFixedDepositRoutes);
app.use('/api/admin/mining', adminMiningRoutes);
app.use('/api/admin/loan', adminLoanRoutes);
app.use('/api/admin/live/chat', adminLiveChatsRoutes);



// user route middleware 
const userSignupEmailVerifyRoute = require('./routes/user/userAuthRoute');


///////////// user route 
app.use('/api/user/auth', userSignupEmailVerifyRoute);


// frontEnd route middleware 
const frontEndHomeRoute = require('./routes/frondEnd/HomeRoutes');
const MenuPageRoute = require('./routes/frondEnd/MenuPageRoutes');
const UserKYCRoute = require('./routes/user/userKYCRoutes');
const UserManualGatewaysRoute = require('./routes/user/PaymentGateways/ManualGatewayRoute');
const UserTradeLogRoute = require('./routes/user/TradeLog/TradeLogRoute');
const UserPracticeTradeLogRoute = require('./routes/user/PracticeTradeLog/PracticeTradeLogRoute');
const UserDepositRoute = require('./routes/user/Deposit/DepositRoute');
const UserWithdrawalRoute = require('./routes/user/Withdrawal/WithdrawalRoute');
const UserNewsletterRoutes = require('./routes/user/Newsletter/NewsletterRoutes');
const UserSupportTicketsRoutes = require('./routes/user/SupportTickets/SupportTicketsRoutes');
const UserTradeMarketsRoute = require('./routes/user/TradeMarkets/TradeMarketsRoute');
const UserFixedDepositRoutes = require('./routes/user/FixedDeposit/FixedDepositRoutes');
const UserMiningRoutes = require('./routes/user/Mining/MiningRoutes');
const UserLoanRoutes = require('./routes/user/Loan/LoanRoutes');


///////////// frontEnd route 
app.use('/api/frontend/home', frontEndHomeRoute);
app.use('/api/frontend/page', MenuPageRoute);
app.use('/api/kyc/verify', UserKYCRoute);
app.use('/api/user/payment/gateways/manual', UserManualGatewaysRoute);
app.use('/api/user/trade/log', UserTradeLogRoute);
app.use('/api/user/Practice/trade/log', UserPracticeTradeLogRoute);
app.use('/api/user/deposit', UserDepositRoute);
app.use('/api/user/withdrawal', UserWithdrawalRoute);
app.use('/api/user/subscribe', UserNewsletterRoutes);
app.use('/api/user/support/tickets', UserSupportTicketsRoutes);
app.use('/api/user/trade/market', UserTradeMarketsRoute);
app.use('/api/user/fixed/deposit', UserFixedDepositRoutes);
app.use('/api/user/mining', UserMiningRoutes);
app.use('/api/user/loan', UserLoanRoutes);





// live chat APi
const ChatsRoutes = require('./routes/user/LiveChatsRoutes/ChatsRoutes');

app.use("/api/chat", ChatsRoutes);





server.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);

});


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        // origin: "http://localhost:3000",
        origin: ["https://gffex.xyz", "https://xenodochial-morning-90071.pktriot.net"],
        default: "https://gffex.xyz"
        // credentials: true,
    },
});

io.on('connection', (socket) => {
    // console.log(socket.id)
    socket.on('join_room', (data) => {
        // console.log('join_room : ', data)
        socket.join(data);
    })
    socket.on('send_message', (data) => {
        // console.log(data)

        // socket.emit('recvice_message',data);

        if (data?.recevierId === null) {
            socket.join(data?.senderId);
            // console.log("user Id", data?.senderId)
            socket.to(data?.senderId).emit("recvice_message", data);
        } else {
            socket.join(data?.recevierId);
            // console.log("admin Id", data?.senderId)
            socket.to(data?.recevierId).emit("recvice_message", data);
        }

        // socket.to(data?.senderId).emit("recvice_message", data);
    })


    // socket.on("join_room", (room) => {
    //     socket.join(room);
    //     console.log("User Joined Room: " + room);
    // });
    // socket.on("typing", (room) => socket.in(room).emit("typing"));
    // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    // socket.on("send_message", (data) => {
    //     console.log("send_message :", data)
    //     if (data?.recevierId === null) {
    //         console.log("user Id", data?.senderId)
    //         socket.to(data?.senderId).emit("recvice_message", data);
    //     } else {
    //         console.log("admin Id", data?.senderId)
    //         socket.to(data?.recevierId).emit("recvice_message", data);
    //     }

    // });


    socket.on('disconnect', () => {
        console.log("user Disconnect")
    })
});
