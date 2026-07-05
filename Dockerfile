# syntax=docker/dockerfile:1.7

FROM maven:3-eclipse-temurin-25 AS build
WORKDIR /workspace

COPY pom.xml ./
COPY domain/pom.xml domain/
COPY infrastructure/pom.xml infrastructure/
COPY application/pom.xml application/
COPY controller/pom.xml controller/
COPY start/pom.xml start/

RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -pl start -am dependency:go-offline -DskipTests || true

COPY domain/src        domain/src
COPY infrastructure/src infrastructure/src
COPY application/src   application/src
COPY controller/src    controller/src
COPY start/src         start/src

RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -pl start -am clean package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=build --chown=app:app /workspace/start/target/start-1.0.0.jar /app/app.jar

USER app
EXPOSE 8080

ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"

ENTRYPOINT ["sh","-c","exec java $JAVA_OPTS -jar /app/app.jar"]
