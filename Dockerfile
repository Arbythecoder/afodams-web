# ── Stage 1: Build React frontend ──────────────────────────────────────────
FROM node:18-alpine AS frontend-build

WORKDIR /frontend

COPY frontend-react/package*.json ./
RUN npm ci

COPY frontend-react/ ./
RUN npm run build

# ── Stage 2: Production backend ─────────────────────────────────────────────
FROM node:18-alpine

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy built frontend into expected relative path (../frontend-react/dist)
COPY --from=frontend-build /frontend/dist /app/frontend-react/dist

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 8080

CMD ["node", "server.js"]
