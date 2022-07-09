import * as functions from "firebase-functions";
import { auth } from "firebase-admin";

export const createUserHandler = async (
  request: functions.Request,
  response: functions.Response
) => {
  try {
    const { email, password, displayName } = request.body.input.credentials;
    const user = await auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    await auth().setCustomUserClaims(user.uid, {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": user.uid,
      },
    });
    functions.logger.log(request.body);
    response.status(200).send({
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error) {
    response.status(500).send({ message: `Message: ${error}` });
  }
};
