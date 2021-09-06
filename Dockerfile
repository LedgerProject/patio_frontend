############################################################
# Dockerfile to run a Django-based web application
# Based on an Ubuntu Image
############################################################

FROM ubuntu:16.04
LABEL author="Marius Mitrofan <marius.mitrofan@netbears.ro>"

LABEL com.supervecina.version="1.0.0"
LABEL vendor="Supervecina"
LABEL com.supervecina.release-date="2021-09-01"
LABEL com.supervecina.version.is-production="false"

ENV HOME /root
ENV PYTHONUNBUFFERED 1
ENV ENV=development
ENV DOCKYARD_SRC=app
ENV DOCKYARD_SRVHOME=/usr/local/src/supervecina-PATIO

RUN apt-get -y -q update

# Install node.js
RUN apt-get install -y bzip2 curl ruby-full git
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get -y -q update && apt-get install -y nodejs build-essential

# Install ruby and compass
RUN gem update --system 3.0.6
RUN gem install compass

RUN mkdir -p $DOCKYARD_SRVHOME

WORKDIR $DOCKYARD_SRVHOME

# Expose ports
EXPOSE 9000
EXPOSE 35730


CMD ["/bin/bash"]