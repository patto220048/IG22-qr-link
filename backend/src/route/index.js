import testRoute from "./test.js";

function route(app){
    app.use("/", testRoute)

}

export default route;