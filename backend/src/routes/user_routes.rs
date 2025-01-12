use actix_web::web;

// TODO: See middleware for other future routes

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route(
                "/register",
                web::post().to(crate::handlers::user_handlers::register),
            )
            .route(
                "/login",
                web::get().to(crate::handlers::user_handlers::login),
            ),
    );
}
