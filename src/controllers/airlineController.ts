import fs = require('fs');
import path = require('path');
import csvParser = require('csv-parser');
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { properties } from '../enum/airline.enum';
import { flight } from '../interfaces/airline';
import { flightsAndPassengers } from '../analytics/flightsAndPassengersByDate';

const PATH_FILE = path.join(__dirname, '../../src/utils/csv/airline_data.csv');

interface queryParams{
  name?: string;
}

const flights: flight[] = [];
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

    private formaObject(obj: { [name: string]: string}): flight{
        const values: string = Object.values(obj)[0]; // Obtener las claves y los valores del objeto original
        const splitedValues = values.split(';'); // Dividir los valores por el delimitador ";"
        
        return  {
            [properties.DATE_UTC]: splitedValues[0],
            [properties.HOUR_UTC]: splitedValues[1],
            [properties.TYPE]: splitedValues[2],
            [properties.AIRPORT]: splitedValues[5],
            [properties.ORIGIN_DESTINATION]: splitedValues[6],
            [properties.AIRLINE]: splitedValues[7],
            [properties.AIRSHIP]: splitedValues[8],
            [properties.PASSENGERS]: Number(splitedValues[9]),
        };
    }
    public getAirline(req: Request, res: Response): void{
        let counter: number = 0;
        try {
            const q: queryParams = req.query;
            if(!q.name) return;
            
            for (let index = 0; index < flights.length; index++) {
                const element = flights[index];
                if(element?.[properties.AIRLINE]?.includes(q?.name?.trim())) counter++;
            }
            res.status(200).send({counter: String(counter), node: process.env.HOSTNAME});
        } catch (error) {
            const errorMsg = error as Error;
            console.log('ERROR ', errorMsg.message);
        }
    }

    public getAnalytics(req: Request, res: Response): void {
        try {
            const analytics = flightsAndPassengers(flights);
            
            res.status(200).send(`
            <h1>Visualizations - node ${process.env.HOSTNAME}</h1>
            <canvas id="myChart"></canvas>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
                var ctx = document.getElementById('myChart');
                new Chart(ctx, ${JSON.stringify(
        analytics
    )});
            </script>
        `);
        }catch (error) {
            const errorMsg = error as Error;
            console.log('ERROR ', errorMsg.message);
        }
    }
}

export default new AirlineController();
