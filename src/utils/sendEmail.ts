import emailjs from "@emailjs/browser";

export async function sendEmail(name: string, email: string, message: string): Promise<boolean> {
  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    return result.status === 200;
  } catch(error) {
    console.error("EmailJS error:", error)
    return false;
  }
}
