import React from 'react';
import { SvelteGantt, SvelteGanttTable } from 'svelte-gantt';
import * as Moment from 'moment';
export class SvelteGanttReact extends React.Component {

    componentWillReceiveProps(nextProps) {
        // pass new props to gantt
        this.instance.$set(nextProps);
    }

    componentDidMount() {
        // instantiate gantt
        // copy options
        this.instance = new SvelteGantt({
            target: this.element,
            props: {
                ...this.props,
                tasks: this.props.tasks,
                rows: this.props.rows,
            }
        });

        // expose api
       
    }

    render() {
        return React.createElement("div", {
            style: { height: '100%' },
            ref: e => {
                this.element = e;
            }
        });
    }
}