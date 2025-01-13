use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/locations")
            .wrap(crate::middleware::auth_middleware::AuthMiddleware)
            .route(
                "/get",
                web::get().to(crate::handlers::location_handlers::get_locations),
            )
            .route(
                "/add",
                web::post().to(crate::handlers::location_handlers::add_locations),
            )
            .route(
                "/{trip_id}",
                web::put().to(crate::handlers::location_handlers::update_location),
            )
            .route(
                "/{trip_id}",
                web::delete().to(crate::handlers::location_handlers::delete_location),
            )
            .route(
                "/comment",
                web::post().to(crate::handlers::location_handlers::add_comment),
            )
            .route(
                "/{location_id}/comments",
                web::get().to(crate::handlers::location_handlers::get_comments_from_location),
            ),
    );
}
