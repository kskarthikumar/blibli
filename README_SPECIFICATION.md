## CORS issue

    * Since proxy configuration added in client side, given API is not allowed with cross-origin. So I worked with chrome browser by disabling web security in local dev environment.

    * To open chrome for development, try below command in terminal:    
    
    "C:/Program Files/Google/Chrome/Application/chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security

## Webpage

    * Build as responsive design based on latest bootstrap framework.
    * "To Top" icon will be displayed if page scroll reaches bottom of page. (Useful for mobile and table screens)

## Angular features

    * Organized code with creating re-usuable components. (Ex. loader, product listing..,)
    * Created Angular service for re-usuable function.
    * Used HTTPCLIENT to make http call.
    * Used slice filter for product name truncating.
    * Template referrence variables used.
    * Created simple and custom pagination which is enabled/disabled based on total page count from response. (response.paging.total_item)

## Error handling

    * Basic validations done (i.e Empty string is not allowed to search).
    * Error message will be displayed if user type and search single letter (i.e a or b).
    * Server/Timeout errors are handled with alert message "Error occured, please try again".