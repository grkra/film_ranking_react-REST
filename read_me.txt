Preparation to use application:
1. Inside REST_API folder start terminal and install node modules:
		npm install
----------------------------------------------------------------------------------------
2. Add file REST_API\.env and pass credentials to connect to Postgres database:
		# Database user
		PG_USER="..."
		# Database host
		PG_HOST="..."
		# Database name
		PG_DATABASE="..."
		# Database password
		PG_PASSWORD="..."
		# Database port number
		PG_PORT="..."
----------------------------------------------------------------------------------------
3. Create Postgres database with structure:
		CREATE TABLE users (
			id serial primary key,
			username VARCHAR(50) not null unique,
			password VARCHAR(255),
			token VARCHAR(255)
		)

		CREATE TABLE films (
			id serial primary key,
			user_id int references users (id),
			title VARCHAR(50),
			score int,
			review text
		)
----------------------------------------------------------------------------------------
4. Inside react_frontend folder start terminal and install node modules:
		npm install
----------------------------------------------------------------------------------------
		

########################################################################################
To start application:
1. Inside REST_API folder open terminal and start application:
		node --watch index.js
----------------------------------------------------------------------------------------
2. Inside react_frontend folder open terminal and start application:
		npm start
----------------------------------------------------------------------------------------