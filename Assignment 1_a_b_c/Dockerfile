# Use Maven to build
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /build

# Copy source code
COPY pom.xml .
COPY src ./src
COPY css ./css
COPY js ./js
COPY images ./images

# Build the JAR
RUN mvn clean package -DskipTests -q

# Runtime
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy JAR
COPY --from=builder /build/target/boutique-*.jar app.jar

# Copy static files
COPY css ./css
COPY js ./js
COPY images ./images

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=docker

CMD ["java", "-jar", "app.jar"]
