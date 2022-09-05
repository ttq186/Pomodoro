from fastapi import HTTPException, status


class ResourcesNotFound(HTTPException):
    def __init__(self, resource_type: str) -> None:
        detail = f"There aren't any {resource_type}."
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class ResourceNotFound(HTTPException):
    def __init__(self, resource_type: str, id: str) -> None:
        detail = f"{resource_type} with id {id} not found!"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class ResourceAlreadyExists(HTTPException):
    def __init__(self, resource_type: str) -> None:
        detail = f"{resource_type} already exists!"
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)


class EmailAlreadyExists(HTTPException):
    def __init__(self) -> None:
        detail = "Email already exists!"
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)


class EmailNotExists(HTTPException):
    def __init__(self) -> None:
        detail = "This email does not exist. Try again!"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class AccountCreatedByGoogle(HTTPException):
    def __init__(self) -> None:
        detail = "Looks like this account created by Google sign in method. Try again!"
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class AccountCreatedWithOutGoogle(HTTPException):
    def __init__(self) -> None:
        detail = (
            "Looks like an account has been created before ",
            "without Google sign in method. Try again!",
        )
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class ResetLinkExpired(HTTPException):
    def __init__(self) -> None:
        detail = "This reset link has expired. Try again!"
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class NotAuthorized(HTTPException):
    def __init__(self) -> None:
        detail = "You don't have this privilege."
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)


class IncorrectLoginCredentials(HTTPException):
    def __init__(self) -> None:
        detail = "Incorrect email or password. Try again!"
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)


class InvalidRefreshToken(HTTPException):
    def __init__(self) -> None:
        detail = "Invalid refresh token. Try again!"
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)
