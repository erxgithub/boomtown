export default function(app) {
    app.set('DEV_JSON_SERVER', 'http://localhost:3001');
    app.set('DEV_WEB_SERVER', 'http://localhost:3000');

    // postgres config
    app.set('PGUSER', process.env.PGUSER || 'boomtowndemo');
    app.set('PGPASSWORD', process.env.PGPASSWORD || 'password');
    app.set('PGDATABASE', process.env.PGDATABASE || 'boomtown');
    app.set('PGHOST', process.env.PGHOST || 'localhost');

    // firebase config
    app.set('FIREBASE_API_KEY', process.env.FIREBASE_API_KEY || 'AIzaSyCUZZMxqzrGXMAAhFi3uTO2WPjFo1CVFzk');
    app.set('FIREBASE_AUTH_DOMAIN', process.env.FIREBASE_AUTH_DOMAIN || 'boomtown-30fc4.firebaseapp.com');
    app.set('FIREBASE_DB_URL', process.env.FIREBASE_DB_URL || 'https://boomtown-30fc4.firebaseio.com');
    app.set('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID || 'boomtown-30fc4');
    app.set('FIREBASE_STORAGE_BUCKET', process.env.FIREBASE_STORAGE_BUCKET || 'boomtown-30fc4.appspot.com');
}
