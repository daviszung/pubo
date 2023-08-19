import * as elements from 'typed-html';

import { Navbar } from './Navbar';


export function App() {
    return (

        <div id="app" class="min-h-screen bg-slate-900 text-white">
            <Navbar current='agent'/>
        </div>
    );
};
