FROM openfoam/openfoam6-graphical-apps
SHELL ["/bin/bash", "-c"]
USER root

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs &&\
    adduser --system --uid 1001 nextjs &&\
    chown nextjs:nodejs /app

RUN apt-get update && apt-get install -y git && apt-get clean &&\
    sed -i 's@^\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@#\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@g' /opt/openfoam6/etc/bashrc &&\
    sed -i 's@\$HOME@/home/nextjs@g' /opt/openfoam6/etc/bashrc

USER nextjs
ENV HOME=/home/nextjs
COPY utils /app/utils
RUN git config --global http.sslverify false &&\
    sh utils/compile_solvers.sh