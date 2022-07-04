import { expect } from "chai";
import config from "../../src/config/config";
import server from "../../src/server";

interface ServerAddress {
  address: string;
  port: number;
}
describe("Server", () => {
  it("App should listen on host:port", (done) => {
    expect((<ServerAddress>(<unknown>server.address())).address).to.equal(
      config.host
    );
    expect((<ServerAddress>(<unknown>server.address())).port).to.equal(
      config.port
    );
    expect(server).to.exist;
    done(() => {
      server.close();
    });
  });
});
