import { Router } from 'express';

import * as pixsyController from '../controllers';

export const pixsyRouter = Router();

pixsyRouter.get('/', pixsyController.getPixsyController);

pixsyRouter.get('/categories', pixsyController.getPixsyCategoriesController);


