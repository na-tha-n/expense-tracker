FROM python:3.9-alpine

COPY requirements.txt requirements.txt

RUN apk add --no-cache --virtual .build-deps \
  build-base \
  python3-dev \
  musl-dev \
  postgresql-dev \
  &&  pip3 install --no-cache-dir -r requirements.txt \
  && apk del --no-cache .build-deps

RUN apk add --no-cache libpq

WORKDIR /app

COPY . .

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["server"]

