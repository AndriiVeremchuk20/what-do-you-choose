import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";

const TokenSchema = z.object({
  id: z.string(),
});

type Token = z.infer<typeof TokenSchema>;

export const decodeToken = async ({
  token,
  secret,
}: {
  token: string;
  secret: string;
}): Promise<Token | null> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    return TokenSchema.parse(payload);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const encodeToken = async ({
  data,
  secret,
}: {
  data: Token;
  secret: string;
}): Promise<string> => {
  const { id } = data;

  const token = await new SignJWT({ id })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secret));

  return token;
};
