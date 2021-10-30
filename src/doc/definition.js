export default {
    openapi: "3.0.0",
    info: {
        title: "Contele API",
        version: "1.0.0",
        description: "An API RESTful for Contele Challenge",
        contact: {
            name: "Stefferson",
            url: "https://lnkd.in/dXRnp7M",
            email: "steffersonthallys@gmail.com",
        },
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`,
        },
    ],
};
