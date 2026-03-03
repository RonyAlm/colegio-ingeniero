/**
 * contact-message controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-message.contact-message', {
    create: async (ctx) => {
        const { email, name, phone, subject, message } = ctx.request.body.data;
        console.log("BODY:", ctx.request.body);
        // console.log("EMAIL:", ctx.request.body?.data?.email);
        // console.log("NAME:", process.env.EMAIL_FROM|| "NO EMAIL");

        console.log(email, name, phone, subject, message);
        const response = await strapi.entityService.create('api::contact-message.contact-message', {
            data: { email, name, phone, subject, message },
        });

        await strapi.plugins['email'].services.email.send({
            to: "rony.almiron.020@gmail.com",
            subject: subject,
            text: message,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Asunto:</strong> ${subject}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
            `,
        })

        return response;
    }
});
