use tokio_postgres::{Client, NoTls, Statement};

const DB_SCHEMA: &str = include_str!("../sql/schema.sql");

pub struct DbStatements {
    pub insert_user: Statement,
    pub get_user_by_email: Statement,
    pub check_user_exists: Statement,
    pub get_trip_from_user: Statement,
    pub insert_trip: Statement,
    pub delete_trip: Statement,
    pub update_trip: Statement,
}

pub struct Db {
    pub client: Client,
    pub statements: DbStatements,
}

impl Db {
    pub async fn new() -> Result<Self, tokio_postgres::Error> {
        let (client, connection) = tokio_postgres::connect(
            "host=localhost user=pmeu dbname=tripify password=pmeu",
            NoTls,
        )
        .await
        .unwrap();
        tokio::spawn(async move {
            if let Err(e) = connection.await {
                eprintln!("connection error: {}", e);
            }
        });

        let (_, insert_user, get_user_by_email, check_user_exists, get_trip_from_user, insert_trip, update_trip, delete_trip) =
            tokio::try_join!(
                client.batch_execute(DB_SCHEMA),
                client.prepare("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)"),
                client.prepare("SELECT id, name, email, password FROM users WHERE email = $1"),
                client.prepare("SELECT id FROM users WHERE email = $1"),
                client.prepare("SELECT * FROM trips WHERE owner_id = $1"),
                client.prepare("INSERT INTO trips (owner_id, description, type, status, destination, departure, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"),
                client.prepare("UPDATE trips SET owner_id = $1, description = $2, type = $3, status = $4, destination = $5, departure = $6, start_date = $7, end_date = $8 WHERE id = $9"),
                client.prepare("DELETE FROM trips WHERE id = $1")
            )?;

        println!("Database schema applied and statements prepared!");

        let statements = DbStatements {
            insert_user,
            get_user_by_email,
            check_user_exists,
            get_trip_from_user,
            insert_trip,
            update_trip,
            delete_trip,
        };

        Ok(Self { client, statements })
    }
}
