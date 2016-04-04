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

Create a configuration file named `config.js` under the `config` folder.

See `config/config-example.js` to create your configuration.

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
$ docker run --volumes-from ui-build -v "${PWD}/nginx.conf:/etc/nginx/nginx.conf" --link community-api -p 80:80 --name community-ui nginx
```
