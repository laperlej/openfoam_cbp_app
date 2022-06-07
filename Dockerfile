FROM node:17 AS deps
COPY ./openfoam_cbp/package.json /app/openfoam_cbp/package.json
WORKDIR /app/openfoam_cbp
RUN npm install

FROM node:17 AS builder
COPY ./openfoam_cbp /app/openfoam_cbp
COPY --from=deps /app/openfoam_cbp/node_modules /app/openfoam_cbp/node_modules
WORKDIR /app/openfoam_cbp
ENV STANDALONE true
RUN npm run build

FROM jlaperle/openfoam_cbp:0.2.0 AS runner
SHELL ["/bin/bash", "-c"]
USER root

RUN curl -sL https://deb.nodesource.com/setup_17.x | bash - &&\
    apt-get install -y gcc g++ make nodejs &&\
    npm update --location=global npm

USER nextjs
ENV HOME=/home/nextjs

COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/public /app/public
COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/package.json /app/package.json
COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/.next/standalone /app/
COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/.next/static /app/.next/static

WORKDIR /app
USER nextjs

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["/usr/bin/node", "/app/server.js"]