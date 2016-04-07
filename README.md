# Community

## Development

### Requirements

You'll need the following already installed on your workstation:

* Node >= 4.4.0
* npm >= 2.14.20

### Setup

Clone the repository:

```shell
$ git clone https://github.com/deviantony/community.git
$ cd community
```

Install the dependencies:

```shell
$ npm install
```

Export your Auth0 domain and client ID.

```shell
$ export AUTH0_DOMAIN=my.auth0.domain
$ export AUTH0_CLIENT_ID=my.auth0.clientID
```

Run the app:

```shell
npm run dev
```

## Docker

Be sure to run the API before trying to run this application.

Build the application and create a Docker data container:

```shell
$ docker run build -t community-ui-build .
$ docker create --name ui-build community-ui-build
```

Serve the app usign Nginx:

```shell
$ docker run --rm --volumes-from ui-build -v "${PWD}/nginx.conf:/etc/nginx/nginx.conf" --link community-api -p 80:80 --name community-ui nginx
```
