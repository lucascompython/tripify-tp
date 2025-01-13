use serde::Serialize;

#[derive(Serialize)]
pub struct Location {
    pub id: i32,
    pub trip_id: i32,
    pub description: String,
    #[serde(rename = "type")]
    pub type_: String,
    pub status: String,
    pub location: String,
    pub start_date: chrono::NaiveDate,
    pub end_date: chrono::NaiveDate,
}
