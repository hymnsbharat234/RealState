const nodeMailer = require('../config/nodemailer');
const path = require('path');

exports.newAdvertisement = (user, property) => {
    let htmlString = nodeMailer.renderTemplate(
        {
            user:user,
            property:property
        },'/advertiser/advertisement.ejs');

    nodeMailer.transporter.sendMail({
        from:'SRConstruction',
        to:'himalayshankar31@gmail.com',
        subject:"SRConstruction Alerts",
        html:htmlString,
        attachments: [
            {
              filename: 'avatar',
              path:path.join(__dirname,'../','/assets',property.avatar[0]),
              cid: 'logo' 
            }
          ]
},(err,info) => {
    if(err)
    {
        console.log('Error in sending mail',err);
        return;
    }
    // console.log('Message sent',info);
    return;
});
}