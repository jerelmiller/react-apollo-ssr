import { hydrateRoot } from 'react-dom/client';

import App from './App';
import './index.css';

hydrateRoot(document, <App assets={(window as any)['assetManifest']} />);
