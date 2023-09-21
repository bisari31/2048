'use client';

import { store } from './store';
import { Provider } from 'react-redux';

export default function ReduxProviders({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
