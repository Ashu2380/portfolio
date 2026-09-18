# ---- stage 1: React frontend ----
FROM node:20-alpine AS febuild
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# ---- stage 2: Spring Boot backend ----
FROM maven:3.9.9-eclipse-temurin-21 AS bebuild
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn -q dependency:go-offline
COPY backend/src ./src
COPY --from=febuild /app/frontend/dist ./src/main/resources/static
RUN mvn -q -DskipTests package

# ---- stage 3: run ----
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=bebuild /app/backend/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
