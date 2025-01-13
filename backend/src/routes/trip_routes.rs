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
            )
            .route(
                "/{trip_id}",
                web::put().to(crate::handlers::trip_handlers::update_trip),
            )
            .route(
                "/delete_shared",
                web::delete().to(crate::handlers::trip_handlers::delete_shared_trip),
            )
            .route(
                "/{trip_id}",
                web::delete().to(crate::handlers::trip_handlers::delete_trip),
            )
            .route(
                "/share",
                web::post().to(crate::handlers::trip_handlers::share_trip),
            )
            .route(
                "/{trip_id}/{owner_id}/valid_users",
                web::get().to(crate::handlers::trip_handlers::get_valid_share_users),
            )
            .route(
                "/comment",
                web::post().to(crate::handlers::trip_handlers::add_comment),
            )
            .route(
                "/{trip_id}/comments",
                web::get().to(crate::handlers::trip_handlers::get_comments),
            )
            .route(
                "/{trip_id}/locations",
                web::get().to(crate::handlers::trip_handlers::get_locations),
            ),
    );
}
