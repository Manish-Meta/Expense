const {user} = require("../../model/user/user");
const {db} = require("../db");


async function seed() {
    
  await db.insert(user).values([
    {
      user_id: "E_121119",
      role: "admin",
    },
    {
      email: "user@example.com",
      role: "user",
    },
  ]);

  console.log("✅ Seeding complete!");
}

