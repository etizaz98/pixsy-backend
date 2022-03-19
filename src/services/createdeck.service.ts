import { Cards,Pixsy,PixsyToCards, connection } from '../config'
import {CreateQuery, CardsData} from '../interfaces'
import {log} from '../log'

export const createPixsy = async (data: any) => {
    const { type, shuffled } = data
    // const CardsRepository = connection.getRepository(Cards);
    try {
        const pixsy: CreateQuery = {
            type,
            shuffled
        }
        const remaining: number = type === 'FULL' ? 52 : 36
        const { raw } = await connection
            .createQueryBuilder()
            .insert()
            .into(Pixsy)
            .values(pixsy)
            .execute();


        const CardsData: CardsData[] = await connection.getRepository(Cards).find({ take :remaining})

        if (shuffled) {

            for (let i = 0; i < 500; i++) {
                let location1 = Math.floor((Math.random() * CardsData.length));
                let location2 = Math.floor((Math.random() * CardsData.length));
                let tmp = CardsData[location1];

                CardsData[location1] = CardsData[location2];
                CardsData[location2] = tmp;
            }
        }

        const cardsToPixsy:any[] = CardsData.map((card: any, i: number) => ({ pixsyId: (raw[0].id as any), cardId: (card as any).id, pixsyposition: i + 1, seen: false }))

        // const { raw: inserted } = 
        await connection
            .createQueryBuilder()
            .insert()
            .into(PixsyToCards)
            .values(cardsToPixsy)
            .execute();
        return {
                "pixsyId": raw[0].id,
                type,
                shuffled,
                remaining
            // raw[0]
        };
    } catch (err) {
        log.error('Error in creating a new Cards:', (err as any).stack);
        throw err;
    }
}