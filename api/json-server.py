import json
from http.server import HTTPServer
from request_handler import HandleRequests, status
from views import get_user, get_all_users, create_user


class JSONServer(HandleRequests):
    '''server class to handle incoming HTTP requests'''

    def do_GET(self):
        '''handle GET requests'''

        response_body = ''
        url = self.parse_url(self.path)

        if url['requested_resource'] == 'users':
            if url['pk'] != 0:
                response_body = get_user(url['pk'])
                return (
                    self.response(response_body, status.HTTP_200_SUCCESS.value)
                    if response_body
                    else self.response(
                        '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
                    )
                )

            response_body = get_all_users()
            return self.response(response_body, status.HTTP_200_SUCCESS.value)

        elif url['requested_resource'] == 'sightings':
            # TODO
            return self.response(
                '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )
        elif url['requested_resource'] == 'cryptids':
            # TODO
            return self.response(
                '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )
        elif url['requested_resource'] == 'locations':
            # TODO
            return self.response(
                '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )

        else:
            return self.response(
                '{}', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
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
                return self.response(
                    json.dumps(new_user), status.HTTP_201_SUCCESS_CREATED.value
                )
            else:
                return self.response('', status.HTTP_500_SERVER_ERROR.value)

        else:
            return self.response(
                '', status.HTTP_404_CLIENT_ERROR_RESOURCE_NOT_FOUND.value
            )


def main():
    host = ''
    port = 8000
    HTTPServer((host, port), JSONServer).serve_forever()


if __name__ == '__main__':

    main()
