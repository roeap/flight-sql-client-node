use arrow_schema::ArrowError;
use snafu::Snafu;

pub type Result<T, E = Error> = std::result::Result<T, E>;

#[derive(Debug, Snafu)]
#[snafu(visibility(pub(crate)))]
pub enum Error {
    #[snafu(display("column '{name}' is missing"))]
    MissingColumn { name: String },
    #[snafu(display("{name}: {message}"))]
    RangeError { name: String, message: String },
    #[snafu(display("{message}"))]
    Arrow {
        source: ArrowError,
        message: &'static str,
    },
}

impl From<Error> for napi::Error {
    fn from(value: Error) -> Self {
        napi::Error::from_reason(value.to_string())
    }
}
