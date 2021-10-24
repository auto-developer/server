
# A oauth2 server based on [node-oauth-server](!https://github.com/oauthjs/node-oauth2-server)

PR is welcome.

## Get Start

- mongodb is required
- redis is required

.env
```bash

# optional default 'root';
MYSQL_USERNAME=<MYSQL_USERNAME>
# optional default '123456';
MYSQL_PASSWORD=<MYSQL_PASSWORD> 
# optional default 'test';
MYSQL_DATABASE=<MYSQL_DATABASE> 
# optional default 3306;
MYSQL_PORT=<MYSQL_PORT> 
# optional default '127.0.0.1';
MYSQL_HOST=<MYSQL_HOST>

# optional default '127.0.0.1';
MONGO_HOST=<MONGO_HOST>
# optional default 27017;
MONGO_PORT=<MONGO_PORT>
# optional default 'test';
MONGO_DATABASE=<MONGO_DATABASE>

# optional default '127.0.0.1';
REDIS_HOST=<REDIS_HOST>
# optional default 6379;
REDIS_PORT=<REDIS_PORT>

# optional default 8080
SERVICE_PORT=<SERVICE_PORT>;
# optional default 'user-server';
APP_KEY=<APP_KEY>

# required
ADMIN_USER_ID=<ADMIN_USER_ID>
ADMIN_CLIENT_ID=<ADMIN_CLIENT_ID>
ADMIN_CLIENT_SECRET=<ADMIN_CLIENT_SECRET>
```



## Oauth2 API

### Get /oauth/authorize

#### Request
| param | required |type| value |
|---|---|---|---|
|response_type|YES|string |code / password|
|client_id|YES|string|6113de587eb4554f83407345|
|redirect_uri|YES|string|http://localhost:3000/callback|
|scope|YES|string/Array|admin|
|state|YES|string|xyz|

example
```
http://localhost:8080/oauth/authorize?response_type=code&client_id=6113de587eb4554f83407345&redirect_uri=http://localhost:3000/callback&scope=admin&state=xyz
```

#### Response
redirect redirect_uri?code=6njk232jkr233r&state=xyz


### POST /oauth/token

#### Request

| param | required |type| value |
|---|---|---|---|
|code|YES|string |code / password|
|client_id|YES|string|6113de587eb4554f83407345|
|redirect_uri|YES|string|http://localhost:3000/callback|
|scope|YES|string/Array|admin|
|state|YES|string|xyz|

#### Response

| param | required |type| value |
|---|---|---|---|
|access_token|YES|string |7ddbd47e4179df88c...|
|expires_in|YES|number|3599|
|refresh_token|YES|string|1a0af56c94100c146...|
|scope|YES|string/Array|["admin"]|
|token_type|YES|string|Bearer|

```json
{
  "access_token": "7ddbd47e4179df88c7629fc941bedbf8b64c45f8",
  "token_type": "Bearer",
  "expires_in": 3599,
  "refresh_token": "1a0af56c94100c146735b6524539f14d3f196d71",
  "scope": [
    "admin"
  ]
}
```

### ALL /oauth/authenticate

#### Request

| param | required |type| value |
|---|---|---|---|
|-|-|- |-|

example
```http request
GET /oauth/authenticate HTTP/1.1

Authorization: Bearer 7ddbd47e4179df88c7629fc941bedbf8b64c45f8
```

#### Response

| param | required |type| value |
|---|---|---|---|
|user|YES|object ||





![](static/assets/流程图.jpg)



# KOA

middleware 

- getUsers
- getUser
- postUser
- deleteUser
- putUser
- patchUser

service

- findUsers
- findUserById
- insertUser
- removeUser
- updateUser
