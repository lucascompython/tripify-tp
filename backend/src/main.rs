use actix_cors::Cors;
use mimalloc::MiMalloc;
#[global_allocator]
static GLOBAL: MiMalloc = MiMalloc;

use actix_web::{web, App, HttpServer};

mod db;
mod handlers;
mod middleware;
mod models;
mod routes;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = web::Data::new(db::Db::new().await.unwrap());

    println!("Server running at http://127.0.0.1:1234");

    if cfg!(debug_assertions) {
        #[cfg(feature = "log")]
        env_logger::init_from_env(env_logger::Env::new().default_filter_or("debug"));
        HttpServer::new(move || {
            App::new()
                .configure(routes::init)
                .wrap(Cors::permissive())
                .wrap(actix_web::middleware::Logger::default())
                .app_data(client.clone())
        })
        .bind(("127.0.0.1", 1234))?
        .run()
        .await
    } else {
        HttpServer::new(move || {
            App::new()
                .wrap(Cors::permissive())
                .app_data(client.clone())
                .configure(routes::init)
        })
        .bind(("127.0.0.1", 1234))?
        .run()
        .await
    }
}
