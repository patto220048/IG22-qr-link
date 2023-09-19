import qrRoute from "./qr.js";
import authRoute from "./auth.js";
import linkRoute from "./link.js";
function route(app){
    app.use("/auth", authRoute)
    app.use("/", qrRoute)
    app.use("/link", linkRoute)
}

export default route;