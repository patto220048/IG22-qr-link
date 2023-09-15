import testRoute from "./test.js";
import authRoute from "./auth.js";

function route(app){
    app.use("/auth", authRoute)
    app.use("/", testRoute)

}

export default route;