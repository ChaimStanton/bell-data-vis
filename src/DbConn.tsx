import * as duckdb from "@duckdb/duckdb-wasm";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import { DataType, Table } from "apache-arrow";

export class DbConn {
  private static db: duckdb.AsyncDuckDB;
  private static connection: duckdb.AsyncDuckDBConnection;

  private static async initialize() {
    const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
      mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
      },
      eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
      },
    };
    const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
    const worker = new Worker(bundle.mainWorker!);
    const logger = new duckdb.ConsoleLogger();
    DbConn.db = new duckdb.AsyncDuckDB(logger, worker);
    await DbConn.db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    DbConn.connection = await DbConn.db.connect();
  }

  public static async loadCSV(filePath: string): Promise<void> {
    if (!DbConn.connection) {
      await DbConn.initialize();
    }
    const query = `CREATE OR REPLACE TABLE data AS SELECT * FROM read_csv_auto('${filePath}')`;
    await DbConn.connection.query(query);
  }

  public static async queryData(
    query: string,
  ): Promise<Table<Record<string, DataType>>> {
    if (!DbConn.connection) {
      await DbConn.initialize();
    }
    return DbConn.connection.query(query);
  }

  public static async getTelematicData(): Promise<
    Table<Record<string, DataType>>
  > {
    if (!DbConn.connection) {
      await DbConn.initialize();
    }
    const eventDescription = "RTP_EVT_DA_JOURNEY_DETAIL_V3";
    const query = `
      SELECT * 
      FROM data
      WHERE "Event Description" != '${eventDescription}';
    `;
    return DbConn.connection.query(query);
  }
}
