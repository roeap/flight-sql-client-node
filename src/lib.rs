#![deny(clippy::all)]

mod conversion;
mod error;
mod flight_client;

use arrow_flight::sql::client::FlightSqlServiceClient;
use napi::bindgen_prelude::*;
use napi_derive::napi;
use snafu::prelude::*;
use tokio::sync::Mutex;
use tonic::transport::Channel;

use crate::conversion::record_batch_to_buffer;
use crate::error::{ArrowSnafu, Result};
use crate::flight_client::{execute_flight, setup_client, ClientArgs};

#[napi]
pub struct FlightSqlClient {
    client: Mutex<FlightSqlServiceClient<Channel>>,
}

#[napi]
impl FlightSqlClient {
    #[napi]
    pub async fn query(&self, query: String) -> napi::Result<Buffer> {
        let mut client = self.client.lock().await;
        let mut prepared_stmt = client.prepare(query, None).await.context(ArrowSnafu {
            message: "failed to prepare statement",
        })?;
        let flight_info = prepared_stmt.execute().await.context(ArrowSnafu {
            message: "failed to execute prepared statement",
        })?;
        let batches = execute_flight(&mut client, flight_info)
            .await
            .context(ArrowSnafu {
                message: "failed to read flight data",
            })?;
        Ok(record_batch_to_buffer(batches)?.into())
    }
}

#[napi]
pub async fn create_flight_sql_client(options: ClientArgs) -> Result<FlightSqlClient, napi::Error> {
    Ok(FlightSqlClient {
        client: Mutex::new(setup_client(options).await.context(ArrowSnafu {
            message: "failed to setup flight sql client",
        })?),
    })
}
