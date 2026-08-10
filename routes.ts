import authConfig from "./auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes
} from "@/routes"

import authConfig from "./auth.config";

const {auth}  = NextAuth(authConfig)