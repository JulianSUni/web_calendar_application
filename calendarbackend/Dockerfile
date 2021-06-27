FROM gradle:6.5-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:11-jre-slim
EXPOSE 8080

#ENV DB_SOURCE=jdbc:postgresql://db:5432/postgres
#ENV DB_USERNAME=postgres
#ENV DB_PASSWORD=root
# ENV DB_SOURCE=jdbc:postgresql://localhost:5432/postgres
# ENV DB_USERNAME=postgres
# ENV DB_PASSWORD=root

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/calendarbackend-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar","/app/calendarbackend-0.0.1-SNAPSHOT.jar"]

# build image with: docker build -t calendarbackend .
# docker run -it -p 8080:8080 --name backend calendarbackend

# instead of localhost db because of docker-compose
#export DB_SOURCE=jdbc:postgresql://db:5432/postgres
#export DB_USERNAME=postgres
#export DB_PASSWORD=root
