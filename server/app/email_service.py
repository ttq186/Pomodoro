from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def send_reset_email(to_emails, reset_link):
    message = Mail(
        from_email="tt.quang.186@gmail.com",
        to_emails="to_emails",
        subject="Reset your password",
    )
    message.template_id = "sendgrid-api-key"
    message.dynamic_template_data = {
        "resetLink": reset_link,
    }

    try:
        sg = SendGridAPIClient(
            "sendgrid-api-key"
        )
        sg.send(message)
    except Exception as e:
        print(e)
