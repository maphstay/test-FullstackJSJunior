export function seed(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { email: "teste01@gmail.com", password: "123456" },
        { email: "teste02@gmail.com", password: "654321" },
        { email: "teste03@gmail.com", password: "123654" },
      ]);
    });
}
