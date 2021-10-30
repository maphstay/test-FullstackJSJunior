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
                { email: "teste04@gmail.com", password: "123456" },
                { email: "teste05@gmail.com", password: "654321" },
                { email: "teste06@gmail.com", password: "123654" },
                { email: "teste07@gmail.com", password: "123456" },
                { email: "teste08@gmail.com", password: "654321" },
                { email: "teste09@gmail.com", password: "123654" },
                { email: "teste10@gmail.com", password: "123456" },
                { email: "teste11@gmail.com", password: "654321" },
                { email: "teste12@gmail.com", password: "123654" },
            ]);
        });
}
