import fs = require('fs');
import path = require('path');
import csvParser = require('csv-parser');
// import es = require('event-stream');
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { properties } from '../enum/airline.enum';

const PATH_FILE = path.join(__dirname, '../../src/utils/csv/airline_data.csv');

interface queryParams{
  name?: string;
}

const flights: any[] = [];
class AirlineController {
  
    constructor() {
        this.initializeData();
    }

    private  async initializeData(): Promise<void> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(PATH_FILE, 'utf8');
            const readableStream = Readable.from(stream);

            readableStream
                .pipe(csvParser())
                .on('data', (data: any) => {
                    return flights.push(this.formaObject(data));
                })
                .on('end', () => {
                    console.log( `finaliza con ${flights.length}`);
                    resolve();
                })
                .on('error', (error: any) => {
                    console.error('Error al procesar el archivo CSV:', error);
                    reject(error);
                });
        });
    }

    private formaObject(obj: { [name: string]: string}){
        // Obtener las claves y los valores del objeto original
        const values: string = Object.values(obj)[0];

        // Dividir los valores por el delimitador ";"
        const splitedValues = values.split(';');
        // Crear un nuevo objeto con las propiedades ordenadas
        return  {
            [properties.DATE_UTC]: splitedValues[0],
            [properties.HOUR_UTC]: splitedValues[1],
            [properties.TYPE]: splitedValues[2],
            [properties.AIRPORT]: splitedValues[5],
            [properties.ORIGIN_DESTINATION]: splitedValues[6],
            [properties.AIRLINE]: splitedValues[7],
            [properties.AIRSHIP]: splitedValues[8],
            [properties.PASSENGERS]: splitedValues[9],
        };
    }
    // private initializeData() {
    //     fs.createReadStream(PATH_FILE, 'utf8')
    //         .pipe(es.split())
    //         .on('data', (data: string) => {
    //             console.log(Buffer.byteLength(data));
    //             flights.push(data);
    //             console.log('agrega', flights.length);
    //         });
    //     console.log('FINALIZA');
    // }
    // private initializeData() {
    //     fs.readFile(PATH_FILE, 'utf8', (err,data) => {
    //         const dataSplited: string[] = data.split('\n');
    //         for (let index = 0; index < dataSplited.length; index++) {
    //             const element = dataSplited[index];
    //             flights.push(element);
    //             console.log('agrega');
    //         }
    //     });
    // }
    public getAirline(req: Request, res: Response): void{
        let counter: number = 0;
        try {
            const q: queryParams = req.query;
            if(!q.name) return;
            
            for (let index = 0; index < flights.length; index++) {
                const element = flights[index];
                if(element?.[properties.AIRLINE]?.includes(q?.name?.trim())) counter++;
            }
            res.status(200).send(String(counter));
        } catch (error) {
            const errorMsg = error as Error;
            console.log('ERROR ', errorMsg.message);
        }
    }
}

export default new AirlineController();
