import nodemailer, { Transporter } from 'nodemailer';

interface MailDetails {
    reciver : string,
    subject : string,
    text : string
}



const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ashutoshpaliwal26@gmail.com',
        pass: 'lkfjnctdxdbtpqvo'
    }
})

export function sendMail(sender : MailDetails) {
    
    let mailDetails = {
        from: 'ashutoshpaliwal26@gmail.com',
        to: sender.reciver,
        subject: sender.subject,
        text: sender.text
    };

    transport.sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
}