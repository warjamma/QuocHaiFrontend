import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/width-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import BasicLayout from '../layouts/BasicLayout'
import AuthLayout from '../layouts/AuthLayout'

import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../theme/index.scss'

import { get } from 'lodash';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  constructor(props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)
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
    const { Component, pageProps, reduxStore, router } = this.props
    const store  = reduxStore.getState()
    const LayoutWrapper = () => {
      if (['/login', '/register', '/forgot-password', '/reset-password'].includes(router.pathname)) {
        return (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout> 
        )
      } else {
        return (
          <BasicLayout>
            <Component {...pageProps} />
          </BasicLayout>
        )
      }
    }
    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={<LayoutWrapper />}
          persistor={this.persistor}
        >
          <Head>
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          </Head>
          <LayoutWrapper />
        </PersistGate>
      </Provider>
    )
  }
};

export default withReduxStore(MyApp)
