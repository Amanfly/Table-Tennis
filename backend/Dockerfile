# FROM ubuntu:18.04 as basee

# RUN apt-get update 

# RUN apt-get install -y bash gcc musl-dev libffi-dev python-dev python3.8-dev python3-pip python3-dev mysql-server default-libmysqlclient-dev libssl-dev software-properties-common
FROM python:3 
ENV PYTHONUNBUFFERED 1



ENV DJANGO_PROJECT_NAME base

# install pypi packages
COPY . /src
COPY requirements.txt /requirements.txt
RUN pip3 install -r requirements.txt

WORKDIR /src

CMD python3 manage.py migrate ; python3 manage.py collectstatic --noinput; python manage.py runserver 0.0.0.0:8888;
