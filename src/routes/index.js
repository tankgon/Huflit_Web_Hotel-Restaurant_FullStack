
const loginRouter = require("../routes/login");
const privateRouter =  require("../routes/private")
const managementRouter = require('../routes/management')
const ceoRouter = require('../routes/ceo')
function route(app)
{
    app.use("/",loginRouter)
    app.use("/private",privateRouter)
    app.use("/management",managementRouter)
    app.use("/ceo",ceoRouter)
}

module.exports = route;