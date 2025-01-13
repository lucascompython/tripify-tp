use actix_web::web;

pub mod location_routes;
pub mod trip_routes;
pub mod user_routes;

pub fn init(cfg: &mut web::ServiceConfig) {
    user_routes::init(cfg);
    trip_routes::init(cfg);
    location_routes::init(cfg);
}
