import { createHash } from "https://deno.land/std@0.118.0/hash/mod.ts";
import { crypto } from "https://deno.land/std@0.118.0/crypto/mod.ts";
import { encode } from "https://deno.land/std@0.118.0/encoding/hex.ts";

export const hashWithSalt = (password: string, salt: string) => {
  const hash = createHash("sha512").update(`${password}${salt}`).toString();

  return hash;
};

export const generateSalt = (): string => {
  const arr = new Uint8Array(64);

  crypto.getRandomValues(arr);

  return encode(arr).toString();
};
