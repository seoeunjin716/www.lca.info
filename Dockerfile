# 의존성 설치 단계
FROM node:20-alpine AS deps
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package.json package-lock.json* ./

# 의존성 설치
RUN npm ci

# 빌드 단계
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 프로덕션 실행 단계
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 시스템 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일들 복사
# public 폴더가 있으면 복사 (없어도 Next.js는 작동함)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
RUN mkdir -p ./public || true

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]

