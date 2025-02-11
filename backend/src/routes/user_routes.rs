use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route(
                "/register",
                web::post().to(crate::handlers::user_handlers::register),
            )
            .route(
                "/login",
                web::post().to(crate::handlers::user_handlers::login),
            )
            .service(
                web::scope("")
                    .wrap(crate::middleware::auth_middleware::AuthMiddleware)
                    .route(
                        "/check",
                        web::get().to(crate::handlers::user_handlers::check),
                    )
                    .route(
                        "/{user_id}",
                        web::get().to(crate::handlers::user_handlers::get_user),
                    )
                    .route(
                        "/{user_id}",
                        web::put().to(crate::handlers::user_handlers::update_user),
                    ),
            ),
    );
}
