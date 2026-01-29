require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const cookie_parser = require("cookie-parser");
const limit = require("express-rate-limit");

const user_route = require("./router/user_route.js");
const expense_route = require("./router/expense_route.js");
const roles = require("./router/router_for_role.js");
const dept = require("./router/dept_route.js");
const category_router = require("./router/category.js");
const work_flow_router = require("./router/workflow.js");
const feedback_router = require("./router/feedback.js");
const email_route = require("./router/emailRoute.js");
const org_router = require("./router/org.js");

const analyticsRouter = require("./router/analytics");

const handle_error = require("./utils/handle_error.js");
const file_not_found = require("./utils/file_not_fount.js");
require("./jobs/aiScheduler");

const port = process.env.port;

const set_limit = limit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  message: "Too many request",
});

app.use(express.json());
app.use(cookie_parser());


app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use("/user", user_route);
app.use("/expenses", expense_route);
app.use("/roles", roles);
app.use("/dept", dept);
app.use("/category", category_router);
app.use("/workflow", work_flow_router);
app.use("/feedback", feedback_router);
app.use("/send_email", email_route);
app.use("/organization", org_router);

app.use("/analytics", analyticsRouter);


app.use("/", file_not_found);

app.use(handle_error);

app.listen(port, () => {
  console.log(" Server running on port", port);
});
