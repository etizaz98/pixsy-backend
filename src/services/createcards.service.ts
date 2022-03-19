import { Cards, connection } from '../config'
import {CardsData} from '../interfaces'

export const createCards = async () => {
    try {
        const suits = ["SPADES", "DAIMONDS", "CLUBS", "HEARTS"];
        const values = ["ACE", "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING"];
        const CardsData: CardsData[] = []
        for (const suit of suits) {
            for (const value of values) {
                const cardData:any = {
                    value,
                    suit,
                    code: `${value[0]}${suit[0]}`

                }
                CardsData.push(cardData)
            }
        }
        await connection
            .createQueryBuilder()
            .insert()
            .into(Cards)
            .values(CardsData)
            .execute();
        return CardsData;
    } catch (err: any) {
        // log.error('Error in creating a new Cards:', err.stack,err.code );
        throw err;
    }
}