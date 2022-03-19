import { PixsyToCards, connection } from '../config'
import { CardsData} from '../interfaces'
import {log} from '../log'

export const getCards = async (data: any) => {
    const { count, pixsy } = data
    // const CardsRepository = connection.getRepository(Cards);
    try {				
            const CardsData: CardsData[] = await connection.getRepository(PixsyToCards).
            query(`with data as (  
                select c.* from pixsy_to_cards as dc inner join cards as c on dc."cardId" = c.id where
               "pixsyId" = '${pixsy}' and seen=false
               order by pixsyposition desc limit ${count}
               )
                 select json_agg(data.*) as cards from data `)

                 await connection.getRepository(PixsyToCards).
                 query(`
                 UPDATE pixsy_to_cards 
                 SET seen=true
               WHERE id in ( select id from pixsy_to_cards  where
               "pixsyId" = '${pixsy}' and seen=false
               order by pixsyposition desc limit ${count})
                     `)	 

        return CardsData
    } catch (err) {
        log.error('Error in creating a new Cards:', (err as any).stack);
        throw err;
    }
}