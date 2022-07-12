import moment from 'moment';

export function time(input) {
    return moment(input, 'HH:mm');
}

const colors = ['blue', 'green', 'orange']
let generation = 0;
let rowCount = 10;

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function generate() {
    const Item = (e) => {
        return `<h1>${e}</h1>`
    }
    const rows = [];
    const tasks = [
        {
            type: 'task',
            id: 1,
            resourceId: 1,
            label: "NAM",
            from: time(`7:30`),
            to: time(`9:20`),
            classes: "green",
            generation
        },
        {
            type: 'task',
            id: 2,
            resourceId: 2,
            label: 'NAM',
            from: time(`9:50`),
            to: time(`11:20`),
            classes: "green",
            generation
        },
        {
            type: 'task',
            id: 3,
            resourceId: 3,
            label: 'NAM',
            from: time(`6:00`),
            to: time(`17:00`),
            classes: "orange",
            generation
        },
        {
            type: 'task',
            id: 4,
            resourceId: 4,
            label: 'NAM',
            from: time(`7:45`),
            to: time(`10:10`),
            classes: "blue",
            generation
        },
        {
            type: 'task',
            id: 5,
            resourceId: 5,
            label: 'NAM',
            from: time(`7:20`),
            to: time(`9:25`),
            classes: "blue",
            generation
        },
        {
            type: 'task',
            id: 6,
            resourceId: 6,
            label: 'NAM',
            from: time(`7:00`),
            to: time(`17:00`),
            classes: "orange",
            generation
        },
        {
            type: 'task',
            id: 7,
            resourceId: 7,
            label: 'NAM',
            from: time(`7:20`),
            to: time(`9:40`),
            classes: "blue",
            generation
        },
    ];
    const dependencies = [
        {
            id: 1,
            fromId: 1,
            toId: 2,
        },
        {
            id: 2,
            fromId: 3,
            toId: 4,
        },
        {
            id: 3,
            fromId: 6,
            toId: 7,
        }
    ]

    const ids = [...Array(rowCount).keys()];
    shuffle(ids);

    for (let i = 1; i <= rowCount; i++) {
        rows.push({
            id: i,
            label: i,
            enableDragging: true,
        });
    }


    generation += 1;

    return { rows, tasks, dependencies };
}