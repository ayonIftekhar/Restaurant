FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . /app
RUN ./mvnw clean install -DskipTests

FROM eclipse-temurin:21
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8869
ENTRYPOINT ["java", "-jar", "app.jar"]
