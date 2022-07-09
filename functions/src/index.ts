import { initializeApp } from "firebase-admin/app";
import * as functions from "firebase-functions";
import { createUserHandler } from "./createUser";
import { getProfileHandler } from "./getProfile";
import { loginHandler } from "./login";
import { notifyAboutCommentHandler } from "./notifyAboutComment";
import initApolloServer from "./remoteSchema";
initializeApp();
export const notifyAboutComment = functions.https.onRequest(
  notifyAboutCommentHandler
);

export const createUser = functions.https.onRequest(createUserHandler);

export const getProfile = functions.https.onRequest(getProfileHandler);
export const userProfile = functions.https.onRequest(
  initApolloServer.createHandler()
);
export const login = functions.https.onRequest(loginHandler);
