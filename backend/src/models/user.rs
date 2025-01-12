pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub password: [u8; 48], // 16 bytes for the salt and 32 bytes for the hash
}
