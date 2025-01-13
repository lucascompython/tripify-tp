use tokio_postgres::{Client, NoTls, Statement};

const DB_SCHEMA: &str = include_str!("../sql/schema.sql");

pub struct DbStatements {
    pub insert_user: Statement,
    pub get_user_by_email: Statement,
    pub check_user_exists: Statement,
    pub get_all_valid_share_users: Statement,
    pub get_user_by_id: Statement,
    pub get_trip_from_user: Statement,
    pub insert_trip: Statement,
    pub update_trip: Statement,
    pub delete_trip: Statement,
    pub delete_shared_trip: Statement,
    pub insert_comment: Statement,
    pub get_comments_from_trip: Statement,
    pub get_locations: Statement,
    pub insert_location: Statement,
    pub delete_location: Statement,
    pub update_location: Statement,
    pub get_locations_from_trip_id: Statement,
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

        let (_, insert_user, get_user_by_email, check_user_exists,  get_all_valid_share_users, get_user_by_id, get_trip_from_user, insert_trip, update_trip, delete_trip, delete_shared_trip, insert_comment, get_comments_from_trip, get_locations, insert_location, delete_location, update_location, get_locations_from_trip_id) =
            tokio::try_join!(
                client.batch_execute(DB_SCHEMA),
                client.prepare("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)"),
                client.prepare("SELECT id, name, email, password FROM users WHERE email = $1"),
                client.prepare("SELECT id FROM users WHERE email = $1"),
                client.prepare("SELECT u.* FROM users u WHERE u.id != $1 AND u.id NOT IN (SELECT ts.user_id FROM trip_shares ts WHERE ts.trip_id = $2)"),
                client.prepare("SELECT id, name, email FROM users WHERE id = $1"),
                client.prepare("SELECT t.* FROM trips t WHERE t.owner_id = $1 UNION SELECT t.* FROM trips t JOIN trip_shares ts ON t.id = ts.trip_id WHERE ts.user_id = $1"),
                client.prepare("INSERT INTO trips (owner_id, description, type, status, destination, departure, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id"),
                client.prepare("UPDATE trips SET owner_id = $1, description = $2, type = $3, status = $4, destination = $5, departure = $6, start_date = $7, end_date = $8 WHERE id = $9"),
                client.prepare("DELETE FROM trips WHERE id = $1"),
                client.prepare("DELETE FROM trip_shares WHERE trip_id = $1 AND user_id = $2"),
                client.prepare("INSERT INTO trip_comments (trip_id, user_id, comment) VALUES ($1, $2, $3) RETURNING id"),
                client.prepare("SELECT tc.id, tc.trip_id, tc.user_id, u.name AS user_name, tc.comment FROM trip_comments tc JOIN users u ON tc.user_id = u.id WHERE tc.trip_id = $1"),
                client.prepare("SELECT id, trip_id, description, type, status, location, start_date, end_date FROM locations"),
                client.prepare("INSERT INTO locations (trip_id, description, type, status, location, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)"),
                client.prepare("DELETE FROM locations WHERE id = $1"),
                client.prepare("UPDATE locations SET description = $1, type = $2, status = $3, location = $4, start_date = $5, end_date = $6 WHERE id = $7"),
                client.prepare("SELECT id, trip_id, description, type, status, location, start_date, end_date FROM locations WHERE trip_id = $1")


            )?;

        println!("Database schema applied and statements prepared!");

        let statements = DbStatements {
            insert_user,
            get_user_by_email,
            check_user_exists,
            get_all_valid_share_users,
            get_user_by_id,
            get_trip_from_user,
            insert_trip,
            update_trip,
            delete_trip,
            delete_shared_trip,
            insert_comment,
            get_comments_from_trip,
            get_locations,
            insert_location,
            delete_location,
            update_location,
            get_locations_from_trip_id,
        };

        Ok(Self { client, statements })
    }
}
