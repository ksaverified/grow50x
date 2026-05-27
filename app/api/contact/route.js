import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, clinicName, plan } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !clinicName) {
      return Response.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const selectedPlan = plan || 'Not specified';

    // Create a transporter using Gmail or your email service
    // Make sure to set these environment variables:
    // EMAIL_USER and EMAIL_PASSWORD (or other SMTP credentials)
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content for the admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'daviddegroeve@gmail.com',
      subject: 'New Contact Form Submission from ClinicFlow',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Clinic Name:</strong> ${clinicName}</p>
        <p><strong>Selected Plan:</strong> ${selectedPlan}</p>
        <hr />
        <p>This is an automated message from the ClinicFlow Contact Form.</p>
      `,
    };

    // Confirmation email for the user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - ClinicFlow',
      html: `
        <h2>Thank you for contacting ClinicFlow!</h2>
        <p>Hi ${name},</p>
        <p>We have received your contact form submission. We will review your information and get back to you as soon as possible.</p>
        <hr />
        <p><strong>Your submitted information:</strong></p>
        <ul>
          <li><strong>Clinic Name:</strong> ${clinicName}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Selected Plan:</strong> ${selectedPlan}</li>
        </ul>
        <p>Best regards,<br/>ClinicFlow Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return Response.json(
      { message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return Response.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
