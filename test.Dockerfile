FROM node:17 AS deps
COPY ./openfoam_cbp /app/openfoam_cbp
WORKDIR /app/openfoam_cbp
RUN npm install
ENTRYPOINT [ "npm" ]
CMD ["run", "test"]