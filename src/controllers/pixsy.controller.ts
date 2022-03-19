import { Response, Request, NextFunction } from 'express';
import {log} from '../log'

import {photo}  from '../config';

export async function getPixsyController(req: Request, res: Response, _next: NextFunction) {


    try {

    
    const { offset=0, limit = 10, search, filter_topics } = req.query

    let photos = photo.photos

    
    if(search) {
        photos = photos.filter((photo: any) => {
                return  photo.topics?.join().includes(search) ||
                filter_topics && (photo.description?.includes(search) ||
                photo.user?.includes(search)) 
            // }
            
        })
    }
    const totalRecords = photos.length


    photos= photos.slice(Number(offset), Number(limit)+Number(offset))

    res.status(200).json({ photos, totalRecords, error: null, message: 'images has been fectched successfully!' });
    } catch( err){
        log.error({ message: 'error in fetching images', statusCode: 500, detail: err, repo: 'prixsy-backend', path: '/api/v1/prixsy' });
        res.status(500).json({data: null ,error: err, message: 'something wrong with getting images' });
    }

}
