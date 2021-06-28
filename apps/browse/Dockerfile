# Since we use Nx, package.json is generated at build time by Nx framework.
# The build process will be handled by nx targets / commands
FROM node:14.16.1-alpine

WORKDIR /app

ENV NODE_ENV production

COPY /dist/apps/browse ./
COPY /node_modules ./node_modules

# https://github.com/nrwl/nx/issues/5473
# RUN yarn install --production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]

ARG COMMITSHA
ARG BUILDDATE
ARG BUILDID
ARG BRANCHNAME

ENV STATUS_COMMITSHA   ${COMMITSHA:-"Missing arg"}
ENV STATUS_BUILDDATE   ${BUILDDATE:-"Missing arg"}
ENV STATUS_BUILDID     ${BUILDID:-"Missing arg"}
ENV STATUS_BRANCHNAME  ${BRANCHNAME:-"Missing arg"}