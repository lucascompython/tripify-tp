use crate::models::user::User;
use crate::utils::hashing_utils::verify;
use crate::utils::json_utils::{json_response, Json};
use crate::utils::jwt_utils::create_token;
use crate::{db::Db, utils::hashing_utils::hash};
use actix_web::{http, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct RegisterRequest {
    name: String,
    email: String,
    password: String,
}

pub async fn register(db: web::Data<Db>, data: web::Bytes) -> impl Responder {
    let Json(user): Json<RegisterRequest> = Json::from_bytes(data).unwrap();

    match db
        .client
        .query(&db.statements.check_user_exists, &[&user.email])
        .await
    {
        Ok(rows) => {
            if rows.len() > 0 {
                return HttpResponse::Conflict().finish();
            }
        }
        Err(_) => {
            return HttpResponse::InternalServerError().finish();
        }
    };

    let password_bytes = hash(&user.password);

    db.client
        .execute(
            &db.statements.insert_user,
            &[&user.name, &user.email, &&password_bytes[..]],
        )
        .await
        .unwrap();

    let token = create_token(&user.email);
    HttpResponse::Ok().body(token)
}

#[derive(Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

pub async fn login(db: web::Data<Db>, data: web::Bytes) -> impl Responder {
    let Json(user_request): Json<LoginRequest> = Json::from_bytes(data).unwrap();

    let user = match db
        .client
        .query_one(&db.statements.get_user_by_email, &[&user_request.email])
        .await
    {
        Ok(row) => {
            let password_slice: &[u8] = row.get(3);
            let mut password_bytes = [0u8; 48];
            password_bytes.copy_from_slice(password_slice);
            User {
                id: row.get(0),
                name: row.get(1),
                email: row.get(2),
                password: password_bytes,
            }
        }
        Err(_) => return HttpResponse::Unauthorized().finish(),
    };

    match verify(&user_request.password, &user.password) {
        true => HttpResponse::Ok()
            .insert_header((http::header::AUTHORIZATION, create_token(&user.email)))
            .body(format!("{},{}", user.id, user.name)),
        false => HttpResponse::Unauthorized().finish(),
    }
}

// TODO: Remove this later

pub async fn check() -> impl Responder {
    HttpResponse::Ok().finish()
}

#[derive(Serialize)]
struct GetUserResponse {
    id: i32,
    name: String,
    email: String,
}

pub async fn get_user(db: web::Data<Db>, user_id: web::Path<i32>) -> impl Responder {
    match db
        .client
        .query_one(&db.statements.get_user_by_id, &[&user_id.into_inner()])
        .await
    {
        Ok(row) => {
            let user = GetUserResponse {
                id: row.get(0),
                name: row.get(1),
                email: row.get(2),
            };
            json_response(&user)
        }
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[derive(Deserialize)]
struct UpdateUserRequest {
    name: String,
    email: String,
    password: String,
}

pub async fn update_user(
    db: web::Data<Db>,
    user_id: web::Path<i32>,
    data: web::Bytes,
) -> impl Responder {
    let Json(user_request): Json<UpdateUserRequest> = Json::from_bytes(data).unwrap();

    let password_bytes = hash(&user_request.password);

    db.client
        .execute(
            &db.statements.update_user,
            &[
                &user_request.name,
                &user_request.email,
                &&password_bytes[..],
                &user_id.into_inner(),
            ],
        )
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}
