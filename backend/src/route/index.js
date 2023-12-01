import qrRoute from './qr.js';
import authRoute from './auth.js';
import userRoute from './user.js';
import cardRoute from './card.js';
import linkRoute from './link.js';
import iconRoute from './icon.js';
function route(app) {
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/card', cardRoute);
    app.use('/api/link', linkRoute);
    app.use('/api/icon', iconRoute);
    app.use('/api', qrRoute);
}

export default route;
