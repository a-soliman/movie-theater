# Movie Theater
## Flask RESTful APP

### Technologies:
1. Server Side
    - Python 3.6
    - Flask
    - Flask-RESTful
    - MongoDB
    - mLab

1. Client Side
    - KnockOut.js
    - jQuery
    - Sass
    - Bootstrap4
    - Gulp
    - Babel
    - Font-Awesome
----
### Installation:
1. Install [Python](https://www.python.org/downloads/)
1. Install [Node](https://nodejs.org/en/)
1. Install Gulp CLI
    ```bash
    npm install gulp-cli -g
    npm install gulp -D
    ```
1. Clone this REPO
    ```bash
    git clone https://github.com/a-soliman/movie-theater.git
    ```
    ```bash
    cd movie-theater/
    ```
1. Install the requirments for SERVER-SIDE
    ```bash
    pip install Flask==1.0.2
    pip install Flask-RESTful==0.3.6
    pip install Py-Mongo==2.8
    ```

1. Install the requirments for CLIENT-SIDE
    1. From the root '/ ' Navigate to client/
    ```bash
    cd client/
    ```

    1. Run 'npm install' or 'npm i' to install the needed packages.
    ```bash
    npm install
    ```
----
### Run Application:
1. from the root '/ ' Navigate to server/
    ```bash
    cd server/
    ```
1. Run app.py
    ```bash
    python app.py
    ```
1. With the server runing, open a new bash terminal and navigate to client from the root '/ '
    ```bash
    cd client/
    ```

1. Run 'npm start' or 'gulp server' to complile the application.

    ```bash
    npm start
    ```

1. open your browser at port 3001 => [http://localhost:3001](http://localhost:3001)

----
### Directions:
1. Root page: http://localhost:3001/ 
    - is where you can view the movies and run the trailers.
1. Admin Page: http://localhost:3001/admin.html 
    - Is where you can view the movies in a table.
    - Can add a new movie to the database.
    - Can edit all the fields in the movie.
    - Can remove a movie.