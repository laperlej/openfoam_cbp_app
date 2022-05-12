FROM node:latest AS builder
SHELL ["/bin/bash", "-c"]
COPY . /app/
WORKDIR /app/openfoam_cbp
RUN npm install nodemon pkg --global
RUN yarn install
#patching semantic-ui bug
RUN sed -i s/\;\;/\;/g node_modules/semantic-ui-css/semantic.min.css
RUN npm run pkg

FROM openfoam/openfoam6-paraview54
USER root
COPY utils /app/utils
COPY --from=builder /app/openfoam_cbp/openfoam_cbp /bin/openfoam_cbp
WORKDIR /app
RUN apt-get update && apt-get install -y git && apt-get clean &&\
git config --global http.sslverify false &&\
sed -i 's@^\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@#\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@g' /opt/openfoam6/etc/bashrc &&\
sed -i 's@\$HOME@/home/openfoam@g' /opt/openfoam6/etc/bashrc
RUN sh utils/compile_solvers.sh
ENTRYPOINT ["/bin/openfoam_cbp"]
