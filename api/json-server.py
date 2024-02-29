import json
from http.server import HTTPServer
from request_handler import HandleRequests, status
from views import get_user, get_all_users, create_user, update_user


def has_unsupported_params(url, supported_params=[]):
    return (
        len([param for param in url['query_params'] if param not in supported_params])
        > 0
    )


class JSONServer(HandleRequests):
    '''server class to handle incoming HTTP requests'''

    def do_GET(self):
        '''handle GET requests'''

        url = self.parse_url(self.path)

        if url['requested_resource'] == 'users':
            if has_unsupported_params(url, ['email']):
                return self.response(
                    '', status.HTTP_400_CLIENT_ERROR_BAD_REQUEST_DATA.value
                )

            email = url['query_params'].get('email', [None])[0]

            if url['pk'] != 0:
                fetched_user = get_user(url['pk'])
                if fetched_user:
                    return self.response(fetched_user, status.HTTP_200_SUCCESS.value)
                else:
                    return self.response(
                        '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
                    )

            fetched_users = get_all_users(email)
            if fetched_users:
                return self.response(fetched_users, status.HTTP_200_SUCCESS.value)
            else:
                return self.response(
                    '[]', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
                )

        elif url['requested_resource'] == 'sightings':
            # TODO
            return self.response(
                '[]', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )
        elif url['requested_resource'] == 'cryptids':
            # TODO
            return self.response(
                '[]', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )
        elif url['requested_resource'] == 'locations':
            # TODO
            return self.response(
                '[]', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )

        else:
            return self.response(
                '[]', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )

    def do_POST(self):
        '''handle POST requests'''

        url = self.parse_url(self.path)

        if url['requested_resource'] == 'users':
            content_len = int(self.headers.get('content-length', 0))
            request_body = self.rfile.read(content_len)
            request_body = json.loads(request_body)
            new_user = create_user(request_body)
            if new_user:
                return self.response(new_user, status.HTTP_201_SUCCESS_CREATED.value)
            else:
                return self.response('', status.HTTP_500_SERVER_ERROR.value)

        else:
            return self.response(
                '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )

    def do_PUT(self):
        '''handle PUT requests from a client'''

        url = self.parse_url(self.path)
        pk = url['pk']

        if url['requested_resource'] == 'users':
            content_len = int(self.headers.get('content-length', 0))
            request_body = self.rfile.read(content_len)
            request_body = json.loads(request_body)
            if pk != 0:
                updated_user = update_user(pk, request_body)
                if updated_user:
                    return self.response(updated_user, status.HTTP_200_SUCCESS.value)
                else:
                    return self.response(
                        '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
                    )

        return self.response(
            '{}',
            status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value,
        )


def main():
    host = ''
    port = 8000
    HTTPServer((host, port), JSONServer).serve_forever()


if __name__ == '__main__':

    main()
