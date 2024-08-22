import * as fs from "fs";

let envBody = `CORS_ORIGIN=http://localhost:5173
JWT_SECRET=<JWT SECRET>
DATABASE_URL=mysql://username:userpassword@localhost:3306/db_name`;

fs.writeFileSync(".env", envBody);
