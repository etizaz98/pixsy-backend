import { Response, Request, NextFunction } from 'express';
import {log} from '../log'

import {photo}  from '../config';

export async function getPixsyCategoriesController(_req: Request, res: Response, _next: NextFunction) {

    // const { offset=0, limit = 10, search } = req.query
try {
    let photos = photo.photos

    
    const topicList = photos.map((photo:any) => photo.topics)
    const AllTopics: any = [...new Set(topicList.flat())]


    const categories = AllTopics.map((topic: string) => {
        const categories = photos.filter((photo:any) => photo.topics.includes(topic))
        return {...categories[0],topic,count: categories.length }
    })
    
    res.status(200).json({ categories, error: null, message: 'pixsy categories has been fetched successfully!' });

} catch(err){
    log.error({ message: 'error in fetching images categories', statusCode: 500, detail: err, repo: 'prixsy-backend', path: '/api/v1/prixsy/categories' });
        res.status(500).json({data: null ,error: err, message: 'something wrong with fetching images categories' });

}
}
