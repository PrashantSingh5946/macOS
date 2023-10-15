#Run npm install for the frontend
npm install

#Run npm install for the server
cd server
npm install
cd ..

#Install vite globally
npm i -g vite

#Run the vite build command
vite build --force

#Move the vite bundled files to server

rm -rf server/dist

mv dist server/