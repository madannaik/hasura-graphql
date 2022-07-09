import { auth } from "firebase-admin";
import * as functions from "firebase-functions";

export const getProfileHandler = async (
  request: functions.Request,
  response: functions.Response
) => {
  try {
    const { id } = request.body.input;
    const { uid, email, displayName } = await auth().getUser(id);

    response.status(200).send({
      id: uid,
      email: email,
      displayName: displayName,
    });
  } catch (error) {
    response.status(400).send({ status: error });
  }
};
