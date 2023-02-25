### START RABBITMQ  
```
docker build -t telemon-rmq .
docker run -d -p 15672:15672 -p 5672:5672 telemon-rmq
```

### Sign IN
After running the docker, you can sign in by visiting `localhost://5672` and the username & password will be same as what is configured under `DockerFile`.
