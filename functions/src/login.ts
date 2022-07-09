import { Request, Response } from "firebase-functions";
import fetch from "node-fetch";
// import * as functions from "firebase-functions";

const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDr7ly-ifBJZ5LLAS3tC1c26wlXn-tNfFI`;

export const loginHandler = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body.input.credentials;
    const loginRequest = await fetch(AUTH_URL, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });
    const { idToken, localId } = (await loginRequest.json()) as any;

    if (!idToken) throw Error("No idToken");

    response.status(200).send({
      accessToken: idToken,
      id: localId,
    });
  } catch (error) {
    response.status(500).send({ message: `Message: ${error}` });
  }
};
