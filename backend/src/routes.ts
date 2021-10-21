import { Router } from "express";
const router = Router();

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";

import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";


router.post('/authenticate', new AuthenticateUserController().handle);
router.post('/messages', ensureAuthenticate, new CreateMessageController().handle);

router.get('/messages/last3', new GetLast3MessagesController().handle);
router.get('/profile', ensureAuthenticate, new ProfileUserController().handle);

export { router };