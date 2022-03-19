import { PixsyToCards ,connection } from '../config'
import { CardsData} from '../interfaces'
import { log } from '../log';

export const getPixsy = async (data: any) => {
    const { pixsyId } = data

    console.log(pixsyId);
    
    // const CardsRepository = connection.getRepository(Cards);
    try {				
            const CardsData: CardsData[] = await connection.getRepository(PixsyToCards).
            query(`with data as (  
                select c.* from pixsy_to_cards as dc 
                inner join cards as c on dc."cardId" = c.id 
                where
               "pixsyId" = '${pixsyId}' and seen=false
               order by pixsyposition ASC
               )
                 select json_agg(data.*) as cards from data`)	
                 
                 const PixsyInfo = await connection.getRepository(PixsyToCards).
                 query(`select * from pixsy where id = '${pixsyId}'`)	
                 const {cards} = CardsData[0] as any
                 console.log(PixsyInfo);
                 const {type,shuffled} = PixsyInfo[0] as any
        return {pixsyId,remaining: cards.length, type,shuffled, cards}
    } catch (err) {
        log.error('Error in creating a new Cards:', (err as any).stack);
        throw err;
    }
}