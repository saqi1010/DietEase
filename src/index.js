
const { app } = require("./routes");
const PORT = 2222;
app.listen(PORT, () => { console.log(`Server is running on this ==>>  http://localhost:${PORT}`) });
