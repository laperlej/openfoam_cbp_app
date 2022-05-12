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

#docker run --rm -it -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
#docker run --rm --network="host" -e SONAR_HOST_URL="http://localhost:9000" -e SONAR_LOGIN="22bfa84ae64f6e166f85fef441a6e08fc70becc6" -v "/Users/jon/Projects/openfoam_cbp_app:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=22bfa84ae64f6e166f85fef441a6e08fc70becc6