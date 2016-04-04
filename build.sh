#!/bin/bash

# TODO: add validation for environments variables. If do not exists, exit 1.
npm run build -- --define AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} --define AUTH0_DOMAIN=${AUTH0_DOMAIN}

cp -r public/* /var/www/html/

/bin/true
