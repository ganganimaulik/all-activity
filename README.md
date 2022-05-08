# AllActivity - Logs App


## How to use

Download/clone the repository: 

 
```sh
git clone https://github.com/ganganimaulik/all-activity.git
cd all-activity
```

Install it and run:

```sh
npm install
npm run dev
```

## Project structure:

- it uses next.js & mui (I figured both of these are used by AllActivity so why not use them).
- sqlite3 is used to store the logs. so no complicated setup required to run project (just run above commands).
- /db folder have the database file & configuration for sequelize.
- /src folder have all react components, customHook and contextProvider used for this project.
- /pages/index.js is the main page & /pages/api have api routes as per next.js standards
- table uses server side pagination.


## API routes:
- `GET /api/logs`: get all logs (paginated) sorted in descending order by startDateTime.
- `POST /api/logs`: add new log.
- `DELETE /api/logs/:id`: delete log by id.


if you have any questions or suggestions, please feel free to contact me at: ganganimaulik@gmail.com

