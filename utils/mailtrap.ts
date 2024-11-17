/* eslint-disable @typescript-eslint/no-explicit-any */
let client: any;

export const initMailtrap = async () => {
  if (typeof window === "undefined") {
    const { MailtrapClient } = await import("mailtrap");
    client = new MailtrapClient({
      token: process.env.MAILTRAP_API_TOKEN!,
    });
  }
};

export const sendWelcomeEmail = async (toEmail: string, name: string) => {
  if (typeof window !== "undefined") {
    console.error("sendWelcomeEmail should only be called on the server side");
    return;
  }

  if (!client) {
    await initMailtrap();
  }

  const sender = { name: "ThreadCraft AI", email: "hello@demomailtrap.com" };
  const year = new Date().getFullYear();
  const ctaUrl = "https://threadcraft-ai.com";

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <header style="background-color: #4CAF50; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to ThreadCraft AI!</h1>
      </header>
      <main style="padding: 20px;">
        <h2 style="color: #4CAF50; margin-top: 0;">Hi ${name},</h2>
        <p style="font-size: 16px; margin: 10px 0;">
          Thank you for joining <strong>ThreadCraft AI</strong>, your new companion for effortless content creation. With our advanced AI tools, creating engaging, professional content has never been easier.
        </p>
        <p style="font-size: 16px; margin: 10px 0;">
          Here’s how you can get started:
        </p>
        <ul style="font-size: 16px; padding-left: 20px; margin: 10px 0;">
          <li><strong>Create:</strong> Use AI-powered tools to craft high-quality content in seconds.</li>
          <li><strong>Customize:</strong> Personalize templates to match your unique style.</li>
          <li><strong>Connect:</strong> Engage your audience with professional-grade content.</li>
        </ul>
        <p style="font-size: 16px; margin: 10px 0;">
          Ready to dive in? Click the button below to explore the magic of ThreadCraft AI!
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${ctaUrl}" target="_blank" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 5px; display: inline-block;">Get Started</a>
        </div>
      </main>
      <footer style="background-color: #f4f4f4; color: #666; text-align: center; padding: 15px; font-size: 14px;">
        <p style="margin: 0;">
          Need assistance? Reach us at 
          <a href="mailto:support@threadcraft-ai.com" style="color: #4CAF50; text-decoration: none;">support@threadcraft-ai.com</a>
        </p>
        <p style="margin: 5px 0 0;">ThreadCraft AI © ${year}. All rights reserved.</p>
      </footer>
    </div>
  `;

  try {
    await client!.send({
      from: sender,
      to: [{ email: toEmail }],
      subject: "Welcome to ThreadCraft AI!",
      html: htmlTemplate,
    });

    console.log(`Welcome email sent successfully to ${toEmail}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};
