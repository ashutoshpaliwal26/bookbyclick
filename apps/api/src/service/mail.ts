import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ashutoshpaliwal26@gmail.com',
        pass: 'lkfjnctdxdbtpqvo'
    }
})

export function sendMail(sender : string) {
    
    let mailDetails = {
        from: 'ashutoshpaliwal26@gmail.com',
        to: sender,
        subject: 'Test mail',
        text: 'Node.js testing mail for GeeksforGeeks'
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