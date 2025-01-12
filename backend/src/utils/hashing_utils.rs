use argon2_kdf::{Hash, Hasher};

#[inline(always)]
pub fn hash(password: &str) -> [u8; 48] {
    let hash = Hasher::new()
        .algorithm(argon2_kdf::Algorithm::Argon2id)
        .salt_length(16)
        .iterations(4)
        .memory_cost_kib(65536)
        .hash_length(32)
        .threads(4)
        .hash(password.as_bytes())
        .unwrap();
    let mut combined_bytes = [0u8; 48]; // 16 bytes for the salt and 32 bytes for the hash

    combined_bytes[..16].copy_from_slice(hash.salt_bytes());
    combined_bytes[16..].copy_from_slice(hash.as_bytes());

    combined_bytes
}

#[inline(always)]
pub fn verify(password: &str, combined_bytes: &[u8; 48]) -> bool {
    let hash = Hash {
        alg: argon2_kdf::Algorithm::Argon2id,
        mem_cost_kib: 65536,
        iterations: 4,
        threads: 4,
        salt: combined_bytes[..16].to_vec(),
        hash: combined_bytes[16..].to_vec(),
    };

    hash.verify(password.as_bytes())
}
