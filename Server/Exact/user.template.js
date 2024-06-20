

const welcomeTem = (firstName) => {
    return `
        <!DOCTYPE html>
<html>
<head>
    <style>
        /* No CSS here, will use inline styles */
    </style>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0;">
    <div style="width: 80%; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 5px; background-color: #f9f9f9;">
        <div style="text-align: center; font-size: 7px; background-color: #4CAF50; color: white; padding: 10px 3px; border-radius: 5px 5px 0 0;">
            <h1>Welcome to Tender Pay</h1>
        </div>
        <div style="margin: 20px 0;">
            <p>Hi ${firstName},</p>
            <p>We are thrilled to have you on board! At Tender Pay (Testing), we strive to provide the best service and experience for our customers. We're excited to have you test our website.</p>
            <p>To get started, here are a few things you can do:</p>
            <ul>
                <li>Visit our website and explore the features.</li>
                <li>Contact Us on whatsApp: +2347044959836, to give your feedback.</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to us or call us at [07044959836]. We're here to help!</p>
            <a href="https://tenderpay.vercel.app/" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;">Get Started</a>
            <p>Thank you for choosing Tender Pay. We look forward to serving you!</p>
            <p>Best Regards,<br>The (Tender Pay) Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777777;">
            <p>&copy; 2024 Tender Pay. All rights reserved.</p>
            <p>ogbomoso, oyostate</p>
        </div>
    </div>
</body>
</html>
    `
}

module.exports = { welcomeTem }