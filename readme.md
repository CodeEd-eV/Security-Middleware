# CodeEd STS (Security Token Service)

The STS consists of three parts:
* The Active Directory (AD) handler that handles user authentification
* The Machine Token (MT) handler that manages Machine to Machine tokens used for two backend services to communicate with each other
* The App registration (Apps) that can be used to register new Apps within the organization, view the own app Id and request/grant read and write permissions for other apps in the organization (more details in the apps section)

## Active Directory Handler

All Active Directory Services are available through **/GET/AD**.

### Login

**/GET/AD/login**

Required parameters:
```
cb: URL to which the authentification token should be sent
```
Returns: 
```
A URL string that the user has to be redirected to in order to log into the service
```
Example flow:
```
1. /GET/AD/login?cb=https://myapp.code-ed.de/loginHandler
2. Redirect user to the return URL
3. User authenticates in Azure AD
4. The STS internally receives a token that can be used to authenticate the user (JWT Bearer Token)
5. https://myapp.code-ed.de/loginHandler?token=e4t5n... is called
```
Hint:
```
For every login process you have to create a new login url.
```
### Validate

**GET/AD/validate**

Required parameters:
```
token: JWT Bearer token
```
Returns:
```
Status 200 if the token is valid
Status 403 if the token is not valid
```
Example:
```
/GET/AD/validate?token=e4t5n...
```

### Profile

**GET/AD/profile**

Receives the Active Directory profile of the signed in user.

Required parameters:

```
token: JWT Bearer token
```

Returns:
```
{
@odata.context: "https://graph.microsoft.com/v1.0/$metadata#users/$entity"
businessPhones: String Array
displayName: String
givenName: String
id: Unique Azure AD ID String
jobTitle: String
mail: String
mobilePhone: String
officeLocation: String
preferredLanguage: Country Code String (e.g. de-de, en-us)
surname: String
userPrincipalName: String
}
```

Example:
```
/GET/AD/profile?token=e4t5n...
```

## Machine Token Handler

### New token

**GET/MT/new**

Creates a new token that can be used to securely communicate between two backend services with making sure that only CodeEd Apps which have pre-approved permissions can access the app.

Required parameters:
```
from: Application ID of the app which wants permission
to: Application ID of the app which should be accessed
```

Returns:
```
JWT Bearer token
```

Example:
```
/GET/MT/new?from=a7gb3...&to=oc943...
```

Hint:
```
Machine tokens can be cached to increase the performance for further backend communication. They also don't expire which means a successful validation can be cached as well (although the token must not be stored persistently!) 
```

### Validate token

**GET/MT/validate**

Validates a Machine token to make sure it has been issued by the STS.

Required parameters:
```
token: JWT Bearer token
```

Returns:
```
from: App Id of the App which requests permissions
to: App Id of the App which grants permissions
permission: Permission level which was granted (r: read, w: write, rw: readwrite)
```
Example:
```
/GET/MT/validate?token=4wasf2...
```



## App registration

### Register a new app

Website to register a new application into the CodeEd application landscape. Requires a user to be logged in to authenticate as a valid member of the organisation.

Required parameters:
```
token: JWT bearer token
```
Returns:
```
HTML Website to register your new app
```
URL:
```
/GET/apps/register?token=e4t5n...
```

### View your apps and review permissions

Website to view your registered apps and to approve permission requests of other applications.

Required parameters:
```
token: JWT bearer token
```
Returns:
```
HTML Website to view your apps
```
URL:
```
/GET/apps/view?token=e4t5n...
```
