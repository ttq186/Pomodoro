from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def send_reset_email(to_emails, reset_link):
    message = Mail(
        from_email="tt.quang.186@gmail.com",
        to_emails="anhkobiet123186@gmail.com",
        subject="Reset your password",
    )
    message.template_id = "d-74a3967325ac45ff82d09fa31246433e"
    message.dynamic_template_data = {
        "resetLink": reset_link,
    }

    try:
        sg = SendGridAPIClient(
            "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"
        )
        sg.send(message)
    except Exception as e:
        print(e)
