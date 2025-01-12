use actix_web::{web, HttpResponse};
use serde::de::DeserializeOwned;
use serde::Serialize;

pub struct Json<T>(pub T);

impl<T> Json<T>
where
    T: DeserializeOwned,
{
    pub fn from_bytes(bytes: web::Bytes) -> Result<Self, sonic_rs::Error> {
        let obj = unsafe { sonic_rs::from_slice_unchecked(&bytes).unwrap() }; // Assuming the bytes are valid JSON
        Ok(Json(obj))
    }
}

pub fn json_response<T>(obj: &T) -> HttpResponse
where
    T: Serialize,
{
    let json = sonic_rs::to_string(obj).unwrap();
    HttpResponse::Ok()
        .content_type("application/json")
        .body(json)
}
