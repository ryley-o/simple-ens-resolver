import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { readFileSync, writeFileSync } from "fs";
import { ethers } from "ethers";

const input = readFileSync("data.csv", "utf8");
const records = parse(input, { columns: true });

for (const record of records) {
  const nonChecksumAddress = record["address"];
  let checksumAddress = nonChecksumAddress;
  if (nonChecksumAddress != "address") {
    checksumAddress = ethers.getAddress(nonChecksumAddress);
  }
  record["address"] = checksumAddress;
}

const output = stringify(records, { header: true });
const fname = "data-checksummed.csv";
writeFileSync(fname, output);
console.log(`Wrote ouputs to ${fname}`);
