# Notifications

## Run

Via Docker

Run the following commands:
``` bash
sudo cp ./.env.example ./.env
sudo docker-compose build
sudo docker-compose up -d
```

## Unit testing

Running the test
``` bash
docker exec notification npm run test
```

Test coverage
``` bash
docker exec notification npm run test:cov
```