use actix_web::{web, HttpResponse, Responder};
use serde::Deserialize;

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
