import { flight } from '../interfaces/airline';

export const flightsAndPassengers = (data: flight[]) => {
    const analytics: { [name: string]: { [name: string]: number } } = {};
    for (let index = 0; index < data.length; index++) {
        const element = data[index] as flight;
        const date = element.date_utc.split('/');
        const month = date[1]; 
        const year = date[2];
        const keyName = `${year}-${month}`;
        if (!analytics[keyName]) {
            analytics[keyName] = {
                flight_number: 0,
                passengers: 0,
            };
        }
        analytics[keyName].flight_number++;
        analytics[keyName].passengers += Number(element.passengers) || 0;
    }

    const labels = Object.keys(analytics);
    const flight_number: number[] = [];
    const passengers: number[] = [];
    labels.forEach((label) => {
        flight_number.push(analytics[label].flight_number);
        passengers.push(analytics[label].passengers);
    });

    return {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Número de vuelos',
                    data: flight_number,
                    backgroundColor: 'blue',
                },
                {
                    label: 'Número de pasajeros',
                    data: passengers,
                    backgroundColor: 'green',
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    };
};