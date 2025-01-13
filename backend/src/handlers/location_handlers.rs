use actix_web::{web, HttpResponse, Responder};
use serde::Deserialize;
use tokio_postgres::types::ToSql;

use crate::{
    db::Db,
    models::location::Location,
    utils::json_utils::{json_response, Json},
};

pub async fn get_locations(db: web::Data<Db>) -> impl Responder {
    match db.client.query(&db.statements.get_locations, &[]).await {
        Ok(rows) => {
            let locations: Vec<Location> = rows
                .iter()
                .map(|row| Location {
                    id: row.get(0),
                    trip_id: row.get(1),
                    description: row.get(2),
                    type_: row.get(3),
                    status: row.get(4),
                    location: row.get(5),
                    start_date: row.get(6),
                    end_date: row.get(7),
                })
                .collect();
            json_response(&locations)
        }
        Err(e) => {
            eprintln!("Error getting locations: {}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[derive(Deserialize)]
pub struct AddLocationRequest {
    trip_id: i32,
    description: String,
    #[serde(rename = "type")]
    type_: String,
    status: String,
    location: String,
    start_date: chrono::NaiveDate,
    end_date: chrono::NaiveDate,
}

pub async fn add_locations(
    db: web::Data<Db>,
    data: web::Json<Vec<AddLocationRequest>>,
) -> impl Responder {
    let locations = data.into_inner();
    let mut query = String::from("INSERT INTO locations (trip_id, description, type, status, location, start_date, end_date) VALUES ");
    let mut params: Vec<&(dyn ToSql + Sync)> = Vec::new();
    let mut counter = 1;

    for (i, location) in locations.iter().enumerate() {
        if i > 0 {
            query.push_str(", ");
        }
        query.push_str(&format!(
            "(${}, ${}, ${}, ${}, ${}, ${}, ${})",
            counter,
            counter + 1,
            counter + 2,
            counter + 3,
            counter + 4,
            counter + 5,
            counter + 6
        ));
        params.push(&location.trip_id);
        params.push(&location.description);
        params.push(&location.type_);
        params.push(&location.status);
        params.push(&location.location);
        params.push(&location.start_date);
        params.push(&location.end_date);
        counter += 7;
    }

    query.push_str(" RETURNING id");

    let result = db.client.query(&query, &params).await;

    match result {
        Ok(rows) => {
            let ids: Vec<i32> = rows.iter().map(|row| row.get(0)).collect();
            HttpResponse::Ok().json(ids)
        }
        Err(e) => {
            eprintln!("Failed to add locations: {}", e);
            HttpResponse::InternalServerError().body("Failed to add locations")
        }
    }
}

pub async fn delete_location(db: web::Data<Db>, location_id: web::Path<i32>) -> impl Responder {
    db.client
        .execute(&db.statements.delete_location, &[&location_id.into_inner()])
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}

#[derive(Deserialize)]
struct UpdateLocationRequest {
    description: String,
    #[serde(rename = "type")]
    type_: String,
    status: String,
    location: String,
    start_date: chrono::NaiveDate,
    end_date: chrono::NaiveDate,
}

pub async fn update_location(
    db: web::Data<Db>,
    data: web::Bytes,
    location_id: web::Path<i32>,
) -> impl Responder {
    let Json(location): Json<UpdateLocationRequest> = Json::from_bytes(data).unwrap();

    db.client
        .execute(
            &db.statements.update_location,
            &[
                &location.description,
                &location.type_,
                &location.status,
                &location.location,
                &location.start_date,
                &location.end_date,
                &location_id.into_inner(),
            ],
        )
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}
