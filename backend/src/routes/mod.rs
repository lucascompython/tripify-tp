use actix_web::web;

pub mod trip_routes;
pub mod user_routes;

pub fn init(cfg: &mut web::ServiceConfig) {
    user_routes::init(cfg);
    trip_routes::init(cfg);
}
