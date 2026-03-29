from rest_framework.authentication import TokenAuthentication

class TokenToUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.auth = TokenAuthentication()

    def __call__(self, request):
        user_auth = self.auth.authenticate(request)
        if user_auth:
            request.user, _ = user_auth
        return self.get_response(request)