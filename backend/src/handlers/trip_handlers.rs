use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

use crate::{
    db::Db,
    models::trip::Trip,
    utils::json_utils::{json_response, Json},
};

pub async fn get_trips(db: web::Data<Db>, path: web::Path<i32>) -> impl Responder {
    let user_id = path.into_inner();

    match db
        .client
        .query(&db.statements.get_trip_from_user, &[&user_id])
        .await
    {
        Ok(rows) => {
            let trips: Vec<Trip> = rows
                .iter()
                .map(|row| Trip {
                    id: row.get(0),
                    owner_id: row.get(1),
                    description: row.get(2),
                    type_: row.get(3),
                    status: row.get(4),
                    destination: row.get(5),
                    departure: row.get(6),
                    start_date: row.get(7),
                    end_date: row.get(8),
                })
                .collect();
            json_response(&trips)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[derive(Deserialize)]
struct AddTripRequest {
    owner_id: i32,
    description: String,
    #[serde(rename = "type")]
    type_: String,
    status: String,
    destination: String,
    departure: String,
    start_date: chrono::NaiveDate,
    end_date: chrono::NaiveDate,
}

pub async fn add_trip(db: web::Data<Db>, data: web::Bytes) -> impl Responder {
    let Json(trip): Json<AddTripRequest> = Json::from_bytes(data).unwrap();

    db.client
        .execute(
            &db.statements.insert_trip,
            &[
                &trip.owner_id,
                &trip.description,
                &trip.type_,
                &trip.status,
                &trip.destination,
                &trip.departure,
                &trip.start_date,
                &trip.end_date,
            ],
        )
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}

pub async fn update_trip(
    db: web::Data<Db>,
    data: web::Bytes,
    trip_id: web::Path<i32>,
) -> impl Responder {
    let Json(trip): Json<AddTripRequest> = Json::from_bytes(data).unwrap();

    db.client
        .execute(
            &db.statements.update_trip,
            &[
                &trip.owner_id,
                &trip.description,
                &trip.type_,
                &trip.status,
                &trip.destination,
                &trip.departure,
                &trip.start_date,
                &trip.end_date,
                &trip_id.into_inner(),
            ],
        )
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}

pub async fn delete_trip(db: web::Data<Db>, trip_id: web::Path<i32>) -> impl Responder {
    let trip_id = trip_id.into_inner();
    db.client
        .execute(&db.statements.delete_trip, &[&trip_id])
        .await
        .unwrap();
    HttpResponse::Ok().finish()
}

#[derive(Deserialize)]
struct ShareTripRequest {
    trip_id: i32,
    user_ids: Vec<i32>,
}
pub async fn share_trip(db: web::Data<Db>, data: web::Bytes) -> impl Responder {
    let Json(share): Json<ShareTripRequest> = Json::from_bytes(data).unwrap();

    let mut query = String::from("INSERT INTO trip_shares (trip_id, user_id) VALUES ");
    let mut params: Vec<&(dyn tokio_postgres::types::ToSql + Sync)> = Vec::new();

    for (i, user_id) in share.user_ids.iter().enumerate() {
        if i > 0 {
            query.push_str(", ");
        }
        query.push_str(&format!("($1, ${})", i + 2));
        params.push(user_id);
    }

    params.insert(0, &share.trip_id);

    db.client.execute(&query, &params).await.unwrap();

    HttpResponse::Ok().finish()
}

#[derive(Deserialize)]
struct DeleteSharedTripRequest {
    trip_id: i32,
    user_id: i32,
}

pub async fn delete_shared_trip(db: web::Data<Db>, data: web::Bytes) -> impl Responder {
    let Json(share): Json<DeleteSharedTripRequest> = Json::from_bytes(data).unwrap();

    db.client
        .execute(
            &db.statements.delete_shared_trip,
            &[&share.trip_id, &share.user_id],
        )
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}

#[derive(Serialize)]
struct GetUserResponse {
    id: i32,
    name: String,
    email: String,
}

pub async fn get_valid_share_users(
    db: web::Data<Db>,
    req: web::Path<(i32, i32)>,
) -> impl Responder {
    let req = req.into_inner();

    match db
        .client
        .query(&db.statements.get_all_valid_share_users, &[&req.1, &req.0])
        .await
    {
        Ok(rows) => {
            let users: Vec<GetUserResponse> = rows
                .iter()
                .map(|row| GetUserResponse {
                    id: row.get(0),
                    name: row.get(1),
                    email: row.get(2),
                })
                .collect();
            json_response(&users)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
