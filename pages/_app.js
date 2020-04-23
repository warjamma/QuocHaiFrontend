import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../theme/index.scss';

import { get } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import withReduxStore from '../lib/width-redux-store';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const { getInitialProps } = Component;
    if (Component.getInitialProps) {
      pageProps = await getInitialProps(ctx);
    }
    return { pageProps };
  };

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const LayoutWrapper = () => {
      return (
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      );
    };
    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={<div className="loading-screen">
            <div className="loader-spinner" />
          </div>}
          persistor={this.persistor}
        >
          <Head>
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          </Head>
          <LayoutWrapper />
        </PersistGate>
      </Provider>
    );
  }
};

export default withReduxStore(MyApp);
