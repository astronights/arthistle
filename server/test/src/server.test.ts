import { expect } from "chai";
import { Server } from "http";

import config from "../../src/config/config";
import server from "../../src/server";


interface ServerAddress {
  address: string;
  port: number;
}

describe("Server", function () {
  let serverInstance: Server;

  this.timeout(5000);

  before((done) => {
    serverInstance = server;

    if (serverInstance.listening) {
      done();
    } else {
      serverInstance.on("listening", () => {
        done();
      });
    }
  });

  it("App should listen on host:port", () => {
    const addressInfo: ServerAddress = serverInstance.address() as ServerAddress;
    expect(addressInfo.address).to.equal(config.host);
    expect(addressInfo.port).to.equal(config.port);
  });

  after((done) => {
    serverInstance.close(done);
  });
});
