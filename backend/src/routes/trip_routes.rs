use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/trips")
            .wrap(crate::middleware::auth_middleware::AuthMiddleware)
            .route(
                "/{user_id}",
                web::get().to(crate::handlers::trip_handlers::get_trips),
            )
            .route(
                "/add",
                web::post().to(crate::handlers::trip_handlers::add_trip),
            ),
    );
}
