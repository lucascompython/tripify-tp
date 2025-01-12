use serde::Serialize;

#[derive(Serialize)]
pub struct Trip {
    pub id: i32,
    pub owner_id: i32,
    pub description: String,
    pub type_: String,
    pub status: String,
    pub destination: String,
    pub departure: String,
    pub start_date: chrono::NaiveDate,
    pub end_date: chrono::NaiveDate,
}
