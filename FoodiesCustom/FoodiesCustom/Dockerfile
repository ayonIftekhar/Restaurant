FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY . /app
RUN ./mvnw clean install -DskipTests
EXPOSE 8869
CMD ["java", "-jar", "target/*.jar", "--server.port=8869"]