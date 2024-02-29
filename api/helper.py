def has_unsupported_params(url, supported_params=[]):
    '''function to check if URL contains unsupported parameters'''
    return (
        len([param for param in url['query_params'] if param not in supported_params])
        > 0
    )
