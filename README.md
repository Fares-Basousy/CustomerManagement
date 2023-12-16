note a .env file must be included in the server file
and it must have a jwtpass variable and a DATABASE_URI variable
DATABASE_URI data can be get from the docker compose file
1 Install Docker 
2 Pull  Postgress image
3 change dir to the server 
  ```
  cd server 
  ```
4 run docker compose file in the server file 
  ```
  docker compose up dev-db
  ```
5 change back to the main dir 
  ```
  cd ..
  ```
6 install reqs
```
npm install
```
6 install boths apps reqs simultaneously
```
npm run installapps
```
6 run both apps simultaneously
```
npm run runapp
```
