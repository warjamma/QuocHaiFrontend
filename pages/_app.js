/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import BasicLayout from '../layouts/BasicLayout';
import withReduxStore from '../lib/width-redux-store';
import '../theme/index.scss';

Router.events.on('routeChangeStart', (url) => {
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
  }

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
          loading={
            <div className="loading-screen">
              <div className="loader-spinner" />
            </div>
          }
          persistor={this.persistor}
        >
          <Head>
            <title>Rocksearch</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta property="fb:app_id" content="1234567890" />
            <meta property="og:type" content="article" />
            <meta
              property="og:url"
              content="http://newsblog.org/news/136756249803614"
            />
            <meta property="og:title" content="Introducing our New Site" />
            <meta
              property="og:image"
              content="https://scontent-sea1-1.xx.fbcdn.net/hphotos-xap1/t39.2178-6/851565_496755187057665_544240989_n.jpg"
            />
            <meta
              property="og:description"
              content="http://samples.ogp.me/390580850990722"
            />
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
            <link
              rel="shortcut icon"
              type="image/png"
              href="/default-avatar.png"
            />
          </Head>
          <LayoutWrapper />
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
