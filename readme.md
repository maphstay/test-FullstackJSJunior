# CONTELE - Challenge (API Restful) - Repository

![CONTELE](./src/assets/contele-logo.jpg)

## :checkered_flag: Dependencies

- Docker 4.1
- Node: 16.13.0
- NPM: 8.1.1
- Express: 4.17.1
- Knex: 0.95.11
- Postgres: 12.7
- Check-password-strength: 2.0.3
- Bcryptjs: 2.4.3
- Regex

To use this repository, follow the steps:

> git clone <https://github.com/maphstay/test-FullstackJSJunior.git>

> cd test-FullstackJSJunior

> docker compose up -d

> access the address of swagger documentation below, for test or you can use postman/insomnia.

> finishing the test use the command docker compose down 

## :scroll: Description

1 - Builded an API with JavaScrip for register users. Where it receives email and password and saves it to a Postgres database through of Knex quert builder.<br/>
2 - It is possible to consult all registered users, consult a single user by ID, create new users composed of email and password, update user's information, delete all users or delete one user, following the premises proposed in <https://github.com/contele/contele-vagas/tree/master/fullstack-junior><br/>
3 - Have been used a library for check strength of password (it's necessary at minimum 6~8 chars beteween letters and numbers) there a library for cryptograph the password and the validation of email was used regex; <br/>
4 - Focusing on Clean Code, DRY, KIS and modularized code.

## :pencil: Documentation

<http://localhost:3000/api-docs/>

## :bust_in_silhouette: Autor

### Stefferson Thallys

---

This README was generated with ❤️ by **Stefferson Thallys**
