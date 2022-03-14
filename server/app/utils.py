from uuid import uuid4

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from app.core.config import settings


def generate_uuid() -> str:
    return str(uuid4())


def send_reset_password_email(to_emails, reset_link):
    message = Mail(
        from_email=settings.SENDGRID_FROM_EMAIL,
        to_emails=to_emails,
        subject="Reset your password",
    )
    message.template_id = settings.SENDGRID_TEMPLATE_ID
    message.dynamic_template_data = {
        "resetLink": reset_link,
    }

    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        sg.send(message)
    except Exception as e:
        print(e)
