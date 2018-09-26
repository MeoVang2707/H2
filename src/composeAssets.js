import 'url-search-params-polyfill';

// app theme
import './assets/styles/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
importAll(require.context('./commons', true, /^\.\/.*\.scss$/));
importAll(require.context('../node_modules/react-places-autocomplete', true, /^\.\/.*\.scss$/));
importAll(require.context('./containers', true, /^\.\/.*\.scss$/));
function importAll(r) {
    r.keys().map(r);
}