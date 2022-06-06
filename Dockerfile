FROM node:17 AS deps
COPY ./openfoam_cbp/package.json /app/openfoam_cbp/package.json
WORKDIR /app/openfoam_cbp
RUN npm install

FROM node:17 AS builder
COPY ./openfoam_cbp /app/openfoam_cbp
COPY --from=deps /app/openfoam_cbp/node_modules /app/openfoam_cbp/node_modules
WORKDIR /app/openfoam_cbp
RUN npm run build

FROM openfoam/openfoam6-graphical-apps AS runner
SHELL ["/bin/bash", "-c"]
USER root

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs &&\
    adduser --system --uid 1001 nextjs &&\
    chown nextjs:nodejs /app

RUN curl -sL https://deb.nodesource.com/setup_17.x | bash - &&\
    apt-get install -y gcc g++ make nodejs &&\
    npm update --location=global npm
RUN apt-get update && apt-get install -y git && apt-get clean &&\
    sed -i 's@^\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@#\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@g' /opt/openfoam6/etc/bashrc &&\
    sed -i 's@\$HOME@/home/nextjs@g' /opt/openfoam6/etc/bashrc

USER nextjs
ENV HOME=/home/nextjs
COPY utils /app/utils
RUN git config --global http.sslverify false &&\
    sh utils/compile_solvers.sh

COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/public /app/public
COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/package.json /app/package.json
COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/.next/standalone /app/
COPY --from=builder --chown=nextjs:nodejs /app/openfoam_cbp/.next/static /app/.next/static

WORKDIR /app
USER nextjs

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["/usr/bin/node", "/app/server.js"]