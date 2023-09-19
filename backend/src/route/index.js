import qrRoute from "./qr.js";
import authRoute from "./auth.js";

function route(app){
    app.use("/auth", authRoute)
    app.use("/", qrRoute)
   
}

export default route;