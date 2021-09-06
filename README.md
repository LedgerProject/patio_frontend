# Supervecina PATIO

This repository contains the Supervecina PATIO project.

## RUN LOCALLY
To run this project locally, Docker is needed. It can be downloaded from the official page: https://www.docker.com/products/docker-desktop

Once downloaded, open a terminal and run the following commands:

- Build container
```
cp Dockerfile.dev Dockerfile
docker rm -f supervecina-patio
docker build -t supervecina-patio .
```

- Run it
```
docker run --name supervecina-patio -tid -v "$(pwd):/usr/local/src/supervecina-PATIO" -p 9000:9000 -p 35731:35730 supervecina-patio
docker exec -ti supervecina-patio /bin/bash


# when inside the container ->

npm install
npm install bower -g
bower install --allow-root
npm install -g grunt-cli@1.3.2
grunt serve
(CTRL + D to exit container)
```
- Access it
```
open localhost:9000
```

**USERNAME:** demo
**PASSWORD:** demo