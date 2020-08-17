const nodeMailer = require('../config/nodemailer');
const path = require('path');

exports.newContact = (user) => {
    let htmlString = nodeMailer.renderTemplate({
        user: user
    }, '/advertiser/contact.ejs');

    nodeMailer.transporter.sendMail({
        from: 'SRConstruction',
        to: 'srconstruction122@gmail.com',
        subject: "SRConstruction Alerts",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Message sent',info);
        return;
    });
}