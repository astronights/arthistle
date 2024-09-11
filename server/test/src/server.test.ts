import { expect } from "chai";
import config from "../../src/config/config";
import server from "../../src/server";

interface ServerAddress {
  address: string;
  port: number;
}

describe("Server", function () {
  let serverInstance: any;

  // Extend timeout limit for this suite
  this.timeout(5000); // 5 seconds, you can adjust this as needed

  before((done) => {
    serverInstance = server;

    // Check if the server is already listening
    if (serverInstance.listening) {
      done();
    } else {
      // Attach listener for the 'listening' event
      serverInstance.on("listening", () => {
        done();
      });
    }
  });

  it("App should listen on host:port", () => {
    const addressInfo = serverInstance.address() as ServerAddress;
    expect(addressInfo.address).to.equal(config.host);
    expect(addressInfo.port).to.equal(config.port);
  });

  after((done) => {
    serverInstance.close(done);
  });
});
