use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use tokio_postgres::types::ToSql;

use crate::{
    db::Db,
    models::location::Location,
    utils::json_utils::{json_response, Json},
};

#[derive(Serialize)]
struct GetLocationResponse {
    id: i32,
    trip_id: i32,
    trip_description: String,
    description: String,
    #[serde(rename = "type")]
    type_: String,
    status: String,
    location: String,
    start_date: chrono::NaiveDate,
    end_date: chrono::NaiveDate,
}

pub async fn get_locations(db: web::Data<Db>) -> impl Responder {
    match db.client.query(&db.statements.get_locations, &[]).await {
        Ok(rows) => {
            let locations: Vec<GetLocationResponse> = rows
                .iter()
                .map(|row| GetLocationResponse {
                    id: row.get(0),
                    trip_id: row.get(1),
                    trip_description: row.get(2),
                    description: row.get(3),
                    type_: row.get(4),
                    status: row.get(5),
                    location: row.get(6),
                    start_date: row.get(7),
                    end_date: row.get(8),
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

#[derive(Deserialize)]
struct AddCommentRequest {
    location_id: i32,
    user_id: i32,
    comment: String,
}

pub async fn add_comment(db: web::Data<Db>, data: web::Bytes) -> impl Responder {
    let Json(comment): Json<AddCommentRequest> = Json::from_bytes(data).unwrap();

    let row = db
        .client
        .query_one(
            &db.statements.insert_location_comment,
            &[&comment.location_id, &comment.user_id, &comment.comment],
        )
        .await
        .unwrap();

    let comment_id: i32 = row.get(0);

    HttpResponse::Ok().body(comment_id.to_string())
}

#[derive(Serialize)]
struct GetCommentResponse {
    id: i32,
    location_id: i32,
    user_id: i32,
    user_name: String,
    comment: String,
}

pub async fn get_comments_from_location(
    db: web::Data<Db>,
    location_id: web::Path<i32>,
) -> impl Responder {
    let location_id = location_id.into_inner();

    match db
        .client
        .query(&db.statements.get_comments_from_location, &[&location_id])
        .await
    {
        Ok(rows) => {
            let comments: Vec<GetCommentResponse> = rows
                .iter()
                .map(|row| GetCommentResponse {
                    id: row.get(0),
                    location_id: row.get(1),
                    user_id: row.get(2),
                    user_name: row.get(3),
                    comment: row.get(4),
                })
                .collect();

            json_response(&comments)
        }
        Err(e) => {
            eprintln!("Error getting comments from location: {}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}
