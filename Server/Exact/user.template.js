

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

const verifyEmailTemplate = (firstName, token) => {
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
        <div style="text-align: center; font-size: 8px; background-color: #4CAF50; color: white; padding: 10px 0; border-radius: 5px 5px 0 0;">
            <h1>Verify Your Email</h1>
        </div>
        <div style="margin: 20px 0;">
            <p>Hi ${firstName},</p>
            <p>Thank you for signing up with [Your Company]! To complete your registration, please verify your email address by clicking the button below:</p>
            <a href="https://tenderpay.vercel.app/user/verify?token=${token}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
            <p><a href="https://tenderpay.vercel.app/user/verify?token=${token}" style="color: #4CAF50;">https://tenderpay.vercel.app/user/verify?token=${token}</a></p>
            <p>If you did not sign up for a Tender pay account, please ignore this email.</p>
            <p>Thank you,<br>The (Tender Pay) Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777777;">
            <p>&copy; 2024 (Tender Pay). All rights reserved.</p>
            <p>Ogbomoso, Oyo state.</p>
        </div>
    </div>
</body>
</html>

    `
}

const passwordResetEmailTemplate = (firstName, Password) => {
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
        <div style="text-align: center; font-size: 8px; background-color: #FF5733; color: white; padding: 10px 0; border-radius: 5px 5px 0 0;">
            <h1>Password Reset</h1>
        </div>
        <div style="margin: 20px 0;">
            <p>Hi ${firstName},</p>
            <p>We received a request to reset your password for your [Your Company] account. Your new password has been generated and is provided below:</p>
            <p style="font-size: 18px; color: #FF5733;"><strong>${Password}</strong></p>
            <p>For security reasons, we recommend changing this temporary password to one of your choice as soon as possible after logging in. You can do this by following these steps:</p>
            <ul>
                <li>Log in to your account using the new password.</li>
                <li>Navigate to your account settings.</li>
                <li>Select the option to change your password.</li>
                <li>Enter a new password of your choice and save the changes.</li>
            </ul>
            <p>If you did not request a password reset, please contact our support team immediately at emmanuelola971@gmail.com .</p>
            <p>Thank you,<br>The Tender Pay Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777777;">
            <p>&copy; 2024 (Tender Pay). All rights reserved.</p>
            <p>Ogbomoso, Oyo state.</p>
        </div>
    </div>
</body>
</html>

    `
}

const creditEmailTemplate = (amount, date, des) => {
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
        <div style="text-align: center; font-size: 8px; background-color: #4CAF50; color: white; padding: 10px 0; border-radius: 5px 5px 0 0;">
            <h1>Credit Transaction Alert</h1>
        </div>
        <div style="margin: 20px 0;">
            <p>Good day,</p>
            <p>We wanted to let you know that a credit transaction has been made to your account:</p>
            <p style="font-size: 18px; color: #4CAF50;"><strong>Amount: ${Number(amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</strong></p>
            <p>Transaction Date: ${date}</p>
            <p>Description: ${des}</p>
            <p>If you have any questions or concerns about this transaction, please contact our support team at emmanuelola961@gmail.com</p>
            <p>Thank you,<br>The Tender Pay Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777777;">
            <p>&copy; 2024 (Tender). All rights reserved.</p>
            <p>Ogbomoso, Oyo state.</p>
        </div>
    </div>
</body>
</html>

    `
}

const debitEmailTemplate = (amount, date, des) => {
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
        <div style="text-align: center; font-size: 8px; background-color: #FF5733; color: white; padding: 10px 0; border-radius: 5px 5px 0 0;">
            <h1>Debit Transaction Alert</h1>
        </div>
        <div style="margin: 20px 0;">
            <p>Good day,</p>
            <p>We wanted to let you know that a debit transaction has been made from your account:</p>
            <p style="font-size: 18px; color: #FF5733;"><strong>Amount: ${Number(amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</strong></p>
            <p>Transaction Date: ${date}</p>
            <p>Description: ${des}</p>
            <p>If you have any questions or concerns about this transaction, please contact our support team at emmanuelola961@gmail.com</p>
            <p>Thank you,<br>The Tender Pay Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777777;">
            <p>&copy; 2024 (Tender Pay). All rights reserved.</p>
            <p>Ogbomoso, oyo state.</p>
        </div>
    </div>
</body>
</html>

    `
}


module.exports = {
    welcomeTem,
    verifyEmailTemplate,
    passwordResetEmailTemplate,
    creditEmailTemplate,
    debitEmailTemplate
}